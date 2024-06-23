"use client";

import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Alert } from "@mui/material";
import { getSettings } from "../../utils/getSettings";
import { getPortfolio } from "../../utils/getPortfolio";
import Header from "../../components/header";
import PdfViewer from "../../components/PdfViewer";

const Portfolio: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [portfolioFile, setPortfolioFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchedSettings = await getSettings();
      setSettings(fetchedSettings);
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolio = await getPortfolio();
      if (portfolio) {
        setPortfolioFile(portfolio.file_url);
      }
    };
    fetchPortfolio();
  }, []);

  const handlePasswordSubmit = () => {
    if (settings && settings.portfolio_password === password) {
      setIsAuthenticated(true);
      setError(null);
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
      <Header />
      <Container sx={{ mt: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {isAuthenticated ? (
          portfolioFile ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <PdfViewer fileUrl={portfolioFile} />
            </Box>
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
              <Typography variant="h6">No portfolio yet. Come back later!</Typography>
              <Button variant="contained" color="primary" href="/" sx={{ mt: 2 }}>
                Go Home
              </Button>
            </Box>
          )
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
            <Typography sx={{ fontFamily: 'monospace' }}>Insert password to access portfolio:</Typography>
            <TextField
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
               autoComplete='off'
              size="small"
              sx={{
                my: 2,
                maxWidth: 300,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                input: {
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  WebkitTextSecurity: 'disc',  // Oculta los caracteres en los navegadores WebKit (Chrome, Safari)
                  MozTextSecurity: 'disc',  // Oculta los caracteres en Firefox
                  textSecurity: 'disc',  // Oculta los caracteres en navegadores que soportan textSecurity (futuro)
                },
              }}
            />
            <Button variant="contained" color="primary" onClick={handlePasswordSubmit}>
              Submit
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Portfolio;
