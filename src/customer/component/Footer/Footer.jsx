import React from 'react';
import { Grid, TextField, Button, IconButton, Typography, Container, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Send } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 10 }}>
      <Box sx={{ bgcolor: '#1e3a8a', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>About Us</Typography>
              <Typography variant="body2">
                We are dedicated to providing high-quality products and exceptional customer service. Our mission is to make your shopping experience enjoyable and satisfying.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>Quick Links</Typography>
              <Typography variant="body2" component="div">
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>Home</li>
                  <li>Products</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>Newsletter</Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
                  sx={{ bgcolor: 'white' }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                  endIcon={<Send />}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ bgcolor: '#172554', color: 'white', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">
                © 2023 Your Company Name. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;