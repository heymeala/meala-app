export function createButtonColor(answer, validated, theme) {
  return validated
    ? answer
      ? { backgroundColor: theme.colors.success }
      : { backgroundColor: theme.colors.error }
    : { backgroundColor: theme.colors.secondary };
}
