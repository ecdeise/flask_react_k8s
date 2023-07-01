import React from 'react';
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function RecipeDialog({open, onClose, maxWidth, children}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogContent>
        <Card>
          <CardContent>
            {children}
            <IconButton
              aria-label="close"
              color="inherit"
              size="medium"
              style={{position: 'absolute', top: 8, right: 8}}
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeDialog;
