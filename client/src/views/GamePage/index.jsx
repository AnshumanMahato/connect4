import { AnimatePresence, motion } from 'framer-motion';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GameBoard from '../../components/GameBoard';
import GameFooter from '../../components/GameFooter';
import GameNav from '../../components/GameNav';
import ScoreCard from '../../components/ScoreCard';
import PauseMenu from '../../components/menus/PauseMenu';
import {
  CONNECTING,
  CONNECTION_FAILED,
  PAUSE,
} from '../../store/constants/navConatansts';
import Notification from '../../components/Notification';
import { connectionFailed, goToHome, connectGame } from '../../store';
import { useEffect } from 'react';
import io from 'socket.io-client';

function GamePage() {
  const {
    player1,
    player2,
    scoreP1,
    scoreP2,
    current: currentPage,
    connection,
  } = useSelector((state) => {
    const { player1, player2, scoreP1, scoreP2, connection } = state.game;
    const { current } = state.navigation;
    return { player1, player2, scoreP1, scoreP2, current, connection };
  }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    let { playerId } = connection;

    const socket = io(import.meta.env.VITE_SOCKET_URL);

    socket.on('connect', () => {
      if (!playerId) socket.emit('join');
      else socket.emit('rejoin', { userId: playerId });
    });

    socket.on('userId', ({ userId }) => {
      const newConnection = { ...connection, playerId: userId };
      dispatch(connectGame(newConnection));
    });

    socket.on('connect_error', () => {
      if (!socket.active) dispatch(connectionFailed());
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [connection, dispatch]);

  return (
    <motion.main
      className="game-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameNav />
      <GameBoard />
      <ScoreCard player={player1} score={scoreP1} />
      <ScoreCard player={player2} score={scoreP2} />
      <GameFooter className="footer" />
      <AnimatePresence mode="wait">
        {(currentPage === CONNECTING ||
          currentPage === CONNECTION_FAILED ||
          currentPage === PAUSE) && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
          >
            {currentPage === CONNECTING && (
              <Notification
                key="connecting"
                title="CONNECTING"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                Connecting to the server...
              </Notification>
            )}
            {currentPage === CONNECTION_FAILED && (
              <Notification
                key="connection-failed"
                title="CONNECTION FAILED"
                onClose={() => dispatch(goToHome())}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                Connection to the server failed. Please try again.
              </Notification>
            )}
            {currentPage === PAUSE && (
              <PauseMenu
                key="pause-menu"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default GamePage;
