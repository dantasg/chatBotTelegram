const YouTube = require('youtube-node');
const config = require('../Json/youtube-config.json');

const youtube = new YouTube();

youtube.setKey(config.key);

function searchVideoURL(message, queryText) {
  return new Promise((resolve, _) => {
    youtube.search(
      `Exercício em casa para ${queryText}`,
      2,
      function (error, result) {
        if (!error) {
          const videoIds = result.items
            .map((item) => item.id.videoId)
            .filter((item) => item);

          const youtubeLinks = videoIds
            .map((videoId) => `https://www.youtube.com/watch?v=${videoId}`)
            .join(', ');

          resolve(`${message} ${youtubeLinks}`);
        } else {
          resolve(
            'Não foi possível encontrar um vídeo no momento, por favor tente mais tarde',
          );
        }
      },
    );
  });
}

module.exports.searchVideoURL = searchVideoURL;
