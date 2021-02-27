import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomeButton({ variant }) {
  return (
    <Link to="/">
      <Button
        leftIcon={<FontAwesomeIcon icon={faHome} />}
        variant={variant}
        width="100%"
        colorScheme="cyan"
      >
        Home
      </Button>
    </Link>
  );
}

export default HomeButton
