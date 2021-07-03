import Sound from 'react-native-sound';

export function playRightAnswerSound() {
  var sound1 = new Sound(require('../../assets/sound/right.mp3'), (error, sound) => {
    if (error) {
      console.log('error' + error.message);
      return;
    }
    sound1.play(() => {
      sound1.release();
    });
  });
}

export function playWrongAnswerSound() {
  var sound1 = new Sound(require('../../assets/sound/wrong.mp3'), (error, sound) => {
    if (error) {
      console.log('error' + error.message);
      return;
    }
    sound1.play(() => {
      sound1.release();
    });
  });
}

export function playFinishQuizSound() {
  var sound1 = new Sound(require('../../assets/sound/score.mp3'), (error, sound) => {
    if (error) {
      console.log('error' + error.message);
      return;
    }
    sound1.play(() => {
      sound1.release();
    });
  });
}
