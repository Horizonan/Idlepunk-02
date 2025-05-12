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
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';

const StyledCard = styled(Card)({
  background: 'rgba(34, 34, 34, 0.95)',
  border: '2px solid #9400D3',
  color: '#00FF00',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 15px rgba(148, 0, 211, 0.3)',
  }
});

const StyledChip = styled(Chip)({
  background: 'rgba(148, 0, 211, 0.1)',
  border: '1px solid #9400D3',
  color: '#00FF00',
  '& .MuiSvgIcon-root': {
    color: '#00FF00'
  }
});

const StyledButton = styled(Button)({
  background: '#222',
  border: '2px solid #9400D3',
  color: '#00FF00',
  '&:hover': {
    background: '#9400D3',
    color: '#222',
    borderColor: '#00FF00'
  },
  '&.Mui-disabled': {
    background: '#800000',
    color: '#666',
    borderColor: '#444'
  }
});

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
    updateCooldown,
    reputation
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

  return (
    <Box className="store-container" sx={{ p: 3, background: 'rgba(26, 26, 26, 0.95)', border: '2px solid #9400D3', borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, borderBottom: '2px solid #9400D3', pb: 2 }}>
        <Typography variant="h5" sx={{ color: '#00FF00' }}>Tech Shop Heist</Typography>
        <StyledButton onClick={onBack}>Close</StyledButton>
      </Box>

      <Box sx={{ 
        mb: 3, 
        p: 3, 
        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
        borderRadius: 2,
        border: '1px solid rgba(148, 0, 211, 0.3)',
        boxShadow: '0 0 10px rgba(148, 0, 211, 0.1)'
      }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ 
                color: '#00FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& span': {
                  color: '#9400D3',
                  fontWeight: 'bold',
                  fontSize: '1.1em'
                }
              }}>
                Required Crew: <span>3</span>
                {assignedCrew.length > 0 && 
                  <Box sx={{ 
                    ml: 1,
                    color: assignedCrew.length === 3 ? '#00FF00' : '#FF4444',
                    fontSize: '0.9em'
                  }}>
                    ({assignedCrew.length}/3)
                  </Box>
                }
              </Typography>
              <Typography sx={{ 
                color: '#00FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& span': {
                  color: '#9400D3',
                  fontWeight: 'bold'
                }
              }}>
                Difficulty: <span>Medium</span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ 
                color: '#00FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& span': {
                  color: '#9400D3',
                  fontWeight: 'bold'
                }
              }}>
                Base Reward: <span>100 Credits</span>
              </Typography>
              <Typography sx={{ 
                color: '#00FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& span': {
                  color: '#9400D3',
                  fontWeight: 'bold'
                }
              }}>
                Loot Drop Chance: <span>15%</span>
              </Typography>
              <Typography sx={{ 
                color: '#00FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
                '& span': {
                  color: '#9400D3',
                  fontWeight: 'bold'
                }
              }}>
                Your Reputation: <span>{reputation}</span> (+5 per successful heist)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ color: '#9400D3', mb: 2 }}>Available Crew</Typography>
          <Grid container spacing={2}>
            {crewMembers.map(crew => (
              <Grid item xs={12} key={crew.id}>
                <StyledCard 
                  sx={{ 
                    opacity: crew.available && reputation >= crew.reqRep ? 1 : 0.6,
                    cursor: crew.available && reputation >= crew.reqRep ? 'pointer' : 'not-allowed'
                  }}
                  onClick={() => crew.available && reputation >= crew.reqRep && assignCrewMember(crew.id)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#00FF00' }}>{crew.name}</Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <StyledChip icon={<SecurityIcon />} label={`Stealth: ${crew.stealth}`} />
                      <StyledChip icon={<BuildIcon />} label={`Tech: ${crew.combat}`} />
                      <StyledChip icon={<PersonIcon />} label={`Skill: ${crew.skill}`} />
                      {crew.reqRep > 0 && (
                        <StyledChip 
                          label={`Required Rep: ${crew.reqRep}`}
                          sx={{ 
                            backgroundColor: reputation >= crew.reqRep ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                            borderColor: reputation >= crew.reqRep ? '#00FF00' : '#FF0000'
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" sx={{ color: '#9400D3', mb: 2 }}>Selected Crew</Typography>
          <Grid container spacing={2}>
            {assignedCrew.map(crew => (
              <Grid item xs={12} key={crew.id}>
                <StyledCard onClick={() => removeCrewMember(crew.id)}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#00FF00' }}>{crew.name}</Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <StyledChip icon={<SecurityIcon />} label={`Stealth: ${crew.stealth}`} />
                      <StyledChip icon={<BuildIcon />} label={`Tech: ${crew.combat}`} />
                      <StyledChip icon={<PersonIcon />} label={`Skill: ${crew.skill}`} />
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {heistProgress > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: '#00FF00', mb: 1 }}>
            Heist Progress: {heistProgress}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={heistProgress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'rgba(148, 0, 211, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#9400D3'
              }
            }} 
          />
        </Box>
      )}

      {heistCooldown > 0 && (
        <Typography sx={{ mt: 2, textAlign: 'center', color: '#ff4444' }}>
          Cooldown: {Math.floor(heistCooldown / 60)}:{(heistCooldown % 60).toString().padStart(2, '0')}
        </Typography>
      )}

      <StyledButton
        fullWidth
        sx={{ mt: 3 }}
        disabled={assignedCrew.length < 3 || heistProgress > 0 || heistCooldown > 0}
        onClick={() => setShowConfirmation(true)}
      >
        Start Heist
      </StyledButton>

      <Dialog 
        open={showConfirmation} 
        onClose={() => setShowConfirmation(false)}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            border: '2px solid #9400D3',
            color: '#00FF00'
          }
        }}
      >
        <DialogTitle sx={{ color: '#00FF00' }}>Start Tech Shop Heist?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#00FF00' }}>Difficulty: Medium</Typography>
          <Typography sx={{ color: '#00FF00' }}>Potential Reward: 100 Credits</Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={() => setShowConfirmation(false)}>Cancel</StyledButton>
          <StyledButton onClick={() => { startHeist(); setShowConfirmation(false); }}>
            Start Heist
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}