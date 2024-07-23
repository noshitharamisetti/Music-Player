// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { motion } from 'framer-motion';
import { Button, Typography, Container } from '@mui/material';
import './App.css';

const songs = [
  { id: 1, title: 'Song 1', src: '/music/song1.mp3' },
  { id: 2, title: 'Song 2', src: '/music/song2.mp3' },
  { id: 3, title: 'Song 3', src: '/music/song3.mp3' },
  { id: 4, title: 'Song 4', src: '/music/song4.mp3' },
  { id: 5, title: 'Song 5', src: '/music/song5.mp3' },
  { id: 6, title: 'Song 6', src: '/music/song6.mp3' }
];

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = (song) => {
    if (currentSong?.id !== song.id) {
      setCurrentSong(song);
      setIsPlaying(true);
      toast.info(`Playing ${song.title}`);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.audio.current.play();
      } else {
        audioRef.current.audio.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Container>
      <Typography variant="h3" className="text-center my-4">Music Player</Typography>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="music-library"
      >
        {songs.map((song) => (
          <motion.div
            key={song.id}
            whileHover={{ scale: 1.05 }}
            className="song-card bg-base-200 p-4 my-2 rounded-lg shadow-lg"
          >
            <Typography variant="h6">{song.title}</Typography>
            <Button variant="contained" color="primary" onClick={() => handlePlay(song)}>
              {currentSong?.id === song.id && isPlaying ? 'Pause' : 'Play'}
            </Button>
          </motion.div>
        ))}
      </motion.div>
      {currentSong && (
        <AudioPlayer
          ref={audioRef}
          src={currentSong.src}
          autoPlay={isPlaying}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
          onEnded={handleAudioEnded}
        />
      )}
      <ToastContainer />
    </Container>
  );
};

export default App;
