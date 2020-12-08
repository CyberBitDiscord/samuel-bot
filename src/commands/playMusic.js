const ytdl = require('ytdl-core')
const yts = require('yt-search')

const queue = new Map();

const start = (msg, song) => {
  const serverQueue = queue.get(msg.guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(msg.guild.id);
    return true
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      start(msg, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Tocando: **${song.title}**`);

  return true
}

exports.skip = ({ msg }) => {
  const serverQueue = queue.get(msg.guild.id);
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "Você precisa estar no mesmo cannal do bot para pular a música!"
    );
  if (!serverQueue)
    return msg.channel.send("Sem músicas na fila!");
  serverQueue.connection.dispatcher.end();

  return true
}

exports.stop = ({ msg }) => {
  const serverQueue = queue.get(msg.guild.id);
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "Você precisa estar no mesmo canal do bot para parar a(s) música(s)!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();

  return true
}

exports.play = async ({ msg }) => {
  const serverQueue = queue.get(msg.guild.id);
  const query = msg.content.split(' ').slice(2).join(' ')
  const data = await yts(query)
  const videos = data.videos

  const voiceChannel = msg.member.voice.channel;

  if (!serverQueue) {
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(msg.guild.id, queueContruct);
  
      queueContruct.songs.push(videos[0]);
  
      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        start(msg, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(msg.guild.id);
        return msg.channel.send(err);
      }
    } else {
      serverQueue.songs.push(videos[0]);
      return msg.channel.send(`${videos[0].title} foi adicionado a fila!`);
  }
  return true
}