import { Button } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

function ProfileButton({ variant }) {
  return (
    <Link to="/profile">
      <Button
        leftIcon={<FontAwesomeIcon icon={faUser} />}
        width="100%"
        variant={variant}
        colorScheme="cyan"
      >
        Profile
      </Button>
    </Link>
  );
}

export default ProfileButton
