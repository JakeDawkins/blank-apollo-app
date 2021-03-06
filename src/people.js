import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PERSON_QUERY = gql`
  {
    jakes {
      firstName
      lastName
    }
  }
`;

const ADDRESSES_QUERY = gql`
  {
    jakes {
      address {
        street
      }
    }
  }
`;

const People = props => {
  const people = props.people;

  return (
    <div>
      {people ? (
        people.map(({ firstName, lastName }) => (
          <Person
            key={Math.random()}
            firstName={firstName}
            lastName={lastName}
          />
        ))
      ) : (
        <p>Aint nothin here</p>
      )}
    </div>
  );
};

// NOTE:
// This data is being hijacked and broken in index.js by the hijack listener.
// Don't rely on it being 100% accurate :)
const withData = graphql(PERSON_QUERY, {
  props: data => {
    return { people: data.data.jakes };
  },
});

export default People;
// export default withData(People);
