const shortWordsPattern = /(^|[\s([{"'«„—-])(в|во|на|за|по|к|ко|с|со|у|о|об|от|до|из|и|а|но|не|же|ли)\s+/giu;

export function typograph(text: string) {
  return text.replace(shortWordsPattern, "$1$2\u00A0");
}
