import { Alert, AlertDescription, Button, ButtonGroup, CloseButton, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, PseudoBox } from "@chakra-ui/core";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link as ReachLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import styles from './Auth.module.css';


function Auth(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const closeError = () => {
    setError(false);
  }

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = (event) => {
    event.preventDefault();
    props.onAuth(username, password, '/auth');
  }

  return (

    <div className={styles.Container}>
      {error &&
      <div className={styles.Alert}> 
        <Alert status="error">
          <AlertDescription> Le nom ou mot de passe n'est pas correct !</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={closeError}/>
        </Alert>
      </div>

      }
      <FormControl className={styles.Form}>
        <div className={styles.Field}>
          <FormLabel htmlFor="nom" className="label">Nom</FormLabel>
          <Input placeholder="Zarn"
            id="nom"
            value={username}
            onChange={(event) => usernameChangeHandler(event)}
          />

        </div>

        <div className={styles.Field}>
          <FormLabel htmlFor="password" className="label">Mot de passe</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              id="password"
              type={show ? "text" : "password"}
              placeholder="PrianaSoumis"
              value={password}
              onChange={(event) => passwordChangeHandler(event)} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Afficher" : "Cacher"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <div className={styles.Field}>
          <ButtonGroup spacing={4}>
            <PseudoBox
              as="button"
              disa
              py={2}
              px={4}
              borderWidth="1px"
              borderColor="black"
              color="black"
              bg="white"
              rounded="sm"
              disabled={!username || !password}
              _hover={!username || !password ? {} : { bg: "black", color: " white" } }
              _disabled={{ opacity: 0.3 }}
              _focus={{ boxShadow: "outline" }}
              onClick={registerHandler}
            >
              Se connecter
                </PseudoBox>
            <Link
              as={ReachLink}
              to="/signin">
              Inscription
            </Link>
          </ButtonGroup>

        </div>
      </FormControl>
      {props.redirect && (
        <Redirect to={props.redirect} />
      )}
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    redirect: state.authReducer.redirect,
    error: state.authReducer.error,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password, method) => dispatch(actions.auth(username, password, method)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
