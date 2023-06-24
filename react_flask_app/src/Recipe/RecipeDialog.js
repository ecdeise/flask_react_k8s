import React from 'react';
import {Dialog, DialogContent, Card, CardContent} from '@mui/material';

function RecipeDialog({open, onClose, maxWidth, children}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogContent>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default RecipeDialog;
