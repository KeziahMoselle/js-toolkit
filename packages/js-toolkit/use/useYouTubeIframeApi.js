let isScriptLoaded = false;
let scriptPromise = null;

/**
 * Load Youtube Iframe API Sript with a promise.
 * @return {Promise<YT>}
 */
export default function useYoutubeIframeApi() {
  if (isScriptLoaded) {
    return Promise.resolve(window.YT);
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      isScriptLoaded = true;
      resolve(window.YT);

      // Remove obsolete stuff
      delete window.onYouTubeIframeAPIReady;
      scriptPromise = undefined;
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  });

  return scriptPromise;
}
