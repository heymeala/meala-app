import hmacsha1 from 'hmacsha1';
import React from 'react';
import Keychain from 'react-native-keychain';
import {FATSECRET_CONSUMER_KEY, FATSECRET_CONSUMER_SECRET} from '@env';

const queryString = require('query-string');

const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
const API_BASE = 'https://platform.fatsecret.com/rest/server.api';
const OAUTH_REQUEST_TOKEN = 'https://www.fatsecret.com/oauth/request_token';
const OAUTH_ACESS_TOKEN = 'https://www.fatsecret.com/oauth/access_token';

const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

function getOauthParameters() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  return [
    ['oauth_consumer_key', FATSECRET_CONSUMER_KEY].join('='),
    ['oauth_nonce', `${timestamp}${Math.floor(Math.random() * 1000000)}`].join(
      '=',
    ),
    ['oauth_signature_method', OAUTH_SIGNATURE_METHOD].join('='),
    ['oauth_timestamp', timestamp].join('='),
    ['oauth_version', OAUTH_VERSION].join('='),
  ];
}

export function signRequest(baseUrl, queryParams, secret, httpMethod = 'GET') {
  const signatureKey = secret
    ? `${FATSECRET_CONSUMER_SECRET}&${secret}`
    : `${FATSECRET_CONSUMER_SECRET}&`;
  const signatureBaseString = [
    httpMethod,
    encodeURIComponent(baseUrl),
    encodeURIComponent(queryParams.join('&')),
  ].join('&');

  return encodeURIComponent(hmacsha1(signatureKey, signatureBaseString));
}

export async function searchFood(query, maxResults = 5) {
  const method = 'foods.search';
  const queryParams = [
    ...getOauthParameters(),
    ['format', 'json'].join('='),
    ['max_results', maxResults].join('='),
    ['method', method].join('='),
    ['search_expression', encodeURIComponent(query)].join('='),
  ].sort((a, b) => a.localeCompare(b));
  const sha = signRequest(API_BASE, queryParams);
  queryParams.push(['oauth_signature', sha].join('='));
  const response = await fetch(`${API_PATH}?${queryParams.join('&')}`);
  return response.json();
}

export async function searchRecipes(query, maxResults = 5) {
  const method = 'recipes.search';
  const queryParams = [
    ...getOauthParameters(),
    ['format', 'json'].join('='),
    ['max_results', maxResults].join('='),
    ['method', method].join('='),
    ['search_expression', encodeURIComponent(query)].join('='),
  ].sort((a, b) => a.localeCompare(b));
  const sha = signRequest(API_BASE, queryParams);
  queryParams.push(['oauth_signature', sha].join('='));
  const response = await fetch(`${API_PATH}?${queryParams.join('&')}`);
  return response.json();
}

export async function getRecipeDetails(id) {
  const method = 'recipe.get';
  const queryParams = [
    ...getOauthParameters(),
    ['format', 'json'].join('='),
    ['recipe_id', id].join('='),
    ['method', method].join('='),
    ['search_expression', encodeURIComponent(id)].join('='),
  ].sort((a, b) => a.localeCompare(b));
  const sha = signRequest(API_BASE, queryParams);
  queryParams.push(['oauth_signature', sha].join('='));
  const response = await fetch(`${API_PATH}?${queryParams.join('&')}`);
  return response.json();
}

export async function getFood(foodId) {
  const method = 'food.get';
  const queryParams = [
    ...getOauthParameters(),
    ['format', 'json'].join('='),
    ['method', method].join('='),
    ['food_id', foodId].join('='),
  ].sort((a, b) => a.localeCompare(b));
  const sha = signRequest(API_BASE, queryParams);
  queryParams.push(['oauth_signature', sha].join('='));
  const response = await fetch(`${API_PATH}?${queryParams.join('&')}`);
  return response.json();
}

function getOauthSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  return [
    ['oauth_nonce', `${timestamp}${Math.floor(Math.random() * 1000000)}`].join(
      '=',
    ),
    ['oauth_version', OAUTH_VERSION].join('='),
    ['oauth_callback', 'oob'].join('='),
    ['oauth_timestamp', timestamp].join('='),
    ['oauth_consumer_key', FATSECRET_CONSUMER_KEY].join('='),
    ['oauth_signature_method', OAUTH_SIGNATURE_METHOD].join('='),
  ];
}

export async function getOauthUrl() {
  const queryParams = [...getOauthSignature()].sort((a, b) =>
    a.localeCompare(b),
  );

  const sha = signRequest(OAUTH_REQUEST_TOKEN, queryParams);
  queryParams.push(['oauth_signature', sha].join('='));

  const urlFetch = `${OAUTH_REQUEST_TOKEN}?${queryParams.join('&')}`;

  return fetch(urlFetch)
    .then((response) => response.text())
    .then((html) => {
      const params = queryString.parse(html);
      return params;
    });
}

function getOauthAccessToken(token, code) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  return [
    ['oauth_token', token].join('='),
    ['oauth_nonce', `${timestamp}${Math.floor(Math.random() * 1000000)}`].join(
      '=',
    ),
    ['oauth_version', OAUTH_VERSION].join('='),
    ['oauth_verifier', code].join('='),
    ['oauth_timestamp', timestamp].join('='),
    ['oauth_consumer_key', FATSECRET_CONSUMER_KEY].join('='),
    ['oauth_signature_method', OAUTH_SIGNATURE_METHOD].join('='),
  ];
}

export function getAccessToken(token, secret, code) {
  const queryParams = [...getOauthAccessToken(token, code)].sort((a, b) =>
    a.localeCompare(b),
  );
  const sha = signRequest(OAUTH_ACESS_TOKEN, queryParams, secret);
  queryParams.push(['oauth_signature', sha].join('='));
  const accessToken = `${OAUTH_ACESS_TOKEN}?${queryParams.join('&')}`;

  return fetch(accessToken)
    .then(
      (response) => response.text(), // .json(), etc.
      // same as function(response) {return response.text();}
    )
    .then((html) => {
      const params = queryString.parse(html);
      return params;
    });
}

function getFoodByDateParams(token) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  return [
    ['oauth_consumer_key', FATSECRET_CONSUMER_KEY].join('='),
    ['oauth_signature_method', OAUTH_SIGNATURE_METHOD].join('='),
    ['oauth_timestamp', timestamp].join('='),
    ['oauth_nonce', `${timestamp}${Math.floor(Math.random() * 1000000)}`].join(
      '=',
    ),
    ['oauth_version', OAUTH_VERSION].join('='),
    ['oauth_token', token].join('='),
  ];
}

function searchParam(date, foodEntryId) {
  if (date !== null) {
    return [['date', date].join('=')];
  } else if (foodEntryId !== null) {
    return [['food_entry_id', foodEntryId].join('=')];
  }
}

export async function getFoodByDateFromUser(date, foodEntryId) {
  const method = 'food_entries.get';

  try {
    // Retrieve the credentials
    const credentials = await Keychain.getInternetCredentials(
      'https://www.fatsecret.com/oauth/authorize',
    );
    if (credentials) {
      const queryParams = [
        ...getFoodByDateParams(credentials.username),
        ['format', 'json'].join('='),
        ['method', method].join('='),
        ...searchParam(date, foodEntryId),
      ].sort((a, b) => a.localeCompare(b));
      const sha = signRequest(API_BASE, queryParams, credentials.password);
      queryParams.push(['oauth_signature', sha].join('='));
      const response = await fetch(`${API_PATH}?${queryParams.join('&')}`);
      return response.json();
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
}
