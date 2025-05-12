
import React, { useState, useEffect } from 'react';
import { useHeistStore } from '../utils/heistStore';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function HeistMenu({ onBack }) {
  const {
    crewMembers,
    assignedCrew,
    heistProgress,
    heistCooldown,
    assignCrewMember,
    removeCrewMember,
    startHeist,
    updateHeistProgress,
    updateCooldown
  } = useHeistStore();

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (heistProgress > 0 && heistProgress < 100) {
      const timer = setInterval(() => updateHeistProgress(), 1000);
      return () => clearInterval(timer);
    }
  }, [heistProgress]);

  useEffect(() => {
    if (heistCooldown > 0) {
      const timer = setInterval(() => updateCooldown(), 1000);
      return () => clearInterval(timer);
    }
  }, [heistCooldown]);

  const handleStartHeist = () => {
    setShowConfirmation(false);
    startHeist();
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" color="primary">Store Robbery: Tech Shop</Typography>
        <Button variant="outlined" onClick={onBack}>Close</Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Required Crew: 3</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Difficulty: Medium</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Base Reward: 100 Credits</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Loot Drop: 15%</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Available Crew</Typography>
          <Grid container spacing={2}>
            {crewMembers.map(crew => (
              <Grid item xs={12} key={crew.id}>
                <Card 
                  sx={{ 
                    cursor: crew.available ? 'pointer' : 'not-allowed',
                    opacity: crew.available ? 1 : 0.6,
                    '&:hover': crew.available ? {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    } : {}
                  }}
                  onClick={() => crew.available && assignCrewMember(crew.id)}
                >
                  <CardContent>
                    <Typography variant="h6">{crew.name}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip icon={<SecurityIcon />} label={`Stealth: ${crew.stealth}`} sx={{ mr: 1 }} />
                      <Chip icon={<BuildIcon />} label={`Combat: ${crew.combat}`} sx={{ mr: 1 }} />
                      <Chip icon={<PersonIcon />} label={`Skill: ${crew.skill}`} />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Cost: {crew.cost} Junk
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Assigned Crew</Typography>
          <Grid container spacing={2}>
            {assignedCrew.map(crew => (
              <Grid item xs={12} key={crew.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => removeCrewMember(crew.id)}
                >
                  <CardContent>
                    <Typography variant="h6">{crew.name}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip icon={<SecurityIcon />} label={`Stealth: ${crew.stealth}`} sx={{ mr: 1 }} />
                      <Chip icon={<BuildIcon />} label={`Combat: ${crew.combat}`} sx={{ mr: 1 }} />
                      <Chip icon={<PersonIcon />} label={`Skill: ${crew.skill}`} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {heistProgress > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>Heist Progress: {heistProgress}%</Typography>
          <LinearProgress variant="determinate" value={heistProgress} sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      )}

      {heistCooldown > 0 && (
        <Typography 
          variant="body1" 
          color="error" 
          sx={{ mt: 2, textAlign: 'center' }}
        >
          Cooldown: {Math.floor(heistCooldown / 60)}:{(heistCooldown % 60).toString().padStart(2, '0')}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={assignedCrew.length < 3 || heistProgress > 0 || heistCooldown > 0}
        onClick={() => setShowConfirmation(true)}
      >
        Start Heist
      </Button>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <DialogTitle>Start Store Robbery?</DialogTitle>
        <DialogContent>
          <Typography>Difficulty: Medium</Typography>
          <Typography>Potential Reward: 100 Credits</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button onClick={handleStartHeist} variant="contained">Start Heist</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
