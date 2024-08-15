'use client';

import { useState, useEffect, use } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { getSettings } from '../../utils/getSettings';
import { getPortfolio } from '../../utils/getPortfolio';
import styles from '../page.module.css';
import Header from '../../components/header';

import dynamic from 'next/dynamic';
import { usePortfolio } from '@/context/PortfolioContext';

const PdfViewer = dynamic(() => import('../../components/PdfViewer'), {
  ssr: false,
});

const Portfolio: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [portfolioFile, setPortfolioFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchedSettings = await getSettings();
      setSettings(fetchedSettings);
    };
    fetchSettings();
  }, []);

  // useEffect(() => {
  //   // const fetchPortfolio = async () => {
  //   //   const portfolio = await getPortfolio();
  //   //   if (portfolio) {
  //   //     setPortfolioFile(portfolio.file_url);
  //   //   }
  //   // };
  //   // fetchPortfolio();

  //   var portfolio = usePortfolio();
  //   set
  // }, []);

  useEffect(() => {
    const prefetchPortfolio = async () => {
      const cachedPortfolio = sessionStorage.getItem('portfolioFile');
      if (cachedPortfolio) {
        setPortfolioFile(cachedPortfolio);
      } else {
        const portfolio = await getPortfolio();
        if (portfolio) {
          setPortfolioFile(portfolio.file_url);
          sessionStorage.setItem('portfolioFile', portfolio.file_url); // Guardar en sessionStorage
        }
      }
    };
    prefetchPortfolio();
  }, []);

  const handlePasswordSubmit = () => {
    if (settings && settings.portfolio_password === password) {
      setTimeout(() => {
        setAuthenticating(true);
      }, 100);

      setTimeout(() => {
        setIsAuthenticated(true);
        setError(null);
        setAuthenticating(false);
      }, 500);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <>
      <Container
        sx={{
          mt: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isAuthenticated ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out',
            zIndex: isAuthenticated ? -1 : 1,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Typography className={styles.enterPasswordLabelText}>
              Enter password to access the portfolio
            </Typography>
            <TextField
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
              autoComplete="off"
              size="small"
              sx={{
                my: 2,
                maxWidth: 300,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                input: {
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  WebkitTextSecurity: 'disc',
                  MozTextSecurity: 'disc',
                  textSecurity: 'disc',
                },
              }}
            />
            <Button
              className={styles.submitButton}
              sx={{
                backgroundColor: authenticating ? 'gray !important' : 'black',
                transition: 'background-color 0.4s ease-in-out',
              }}
              variant="contained"
              onClick={handlePasswordSubmit}
            >
              Submit
              {/* {authenticating && <CircularProgress size={13} sx={{ ml: '0.4rem' }} color="inherit" />} */}
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            opacity: isAuthenticated ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            zIndex: isAuthenticated ? 1 : -1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: isAuthenticated ? '100%' : '0 !important',
            overflow: isAuthenticated ? 'visible' : 'hidden',
            marginTop: '3rem',
            position: 'absolute',

            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          {portfolioFile ? (
            <PdfViewer fileUrl={portfolioFile} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h6">
                No portfolio yet. Come back later!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ mt: 2 }}
              >
                Go Home
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Portfolio;
