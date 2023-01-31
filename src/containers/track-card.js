import React from 'react';
import styled from '@emotion/styled';
import { colors, mq } from '../styles';
import { humanReadableTimeFromSeconds } from '../utils/helpers';
import { Link } from '@reach/router';
import { gql, useMutation } from '@apollo/client';

/**
 * Mutation to increment a track's number of views
 */
const INCREMENT_TRACK_VIEWS = gql`
  mutation IncrementTrackViewsMutation(
    $incrementTrackViewsId: ID!
  ) {
    incrementTrackViews(id: $incrementTrackViewsId) {
      code
      success
      message
      track {
        id
        numberOfViews
      }
    }
  }
`;

/**
 * Track Card component renders basic info in a card format
 * for each track populating the tracks grid homepage.
 */
const TrackCard = ({ track }) => {
  const {
    title,
    thumbnail,
    author,
    length,
    modulesCount,
    id,
  } = track;

  const [incrementTrackViews] = useMutation(
    INCREMENT_TRACK_VIEWS,
    {
      variables: { incrementTrackViewsId: id },
      // to observe what the mutation response returns
      onCompleted: (data) => {
        // console.log(data);
      },
    }
  );

  return (
    <CardContainer
      to={`/track/${id}`}
      onClick={incrementTrackViews}
    >
      <CardContent>
        <CardImageContainer>
          <ColorOverlay />
          <CardImage src={thumbnail} alt={title} />
        </CardImageContainer>
        <CardBody>
          <CardTitle>{title || ''}</CardTitle>
          <CardFooter>
          <AuthorImageContainer>
            <AuthorImage src={author.photo} />
            </AuthorImageContainer>
            <AuthorAndTrack>
              <AuthorName>{author.name}</AuthorName>
              <TrackLength>
                {modulesCount} modules -{' '}
                {humanReadableTimeFromSeconds(length)}
              </TrackLength>
            </AuthorAndTrack>
          </CardFooter>
        </CardBody>
      </CardContent>
    </CardContainer>
  );
};

export default TrackCard;

/** Track Card styled components */
const CardContainer = styled(Link)({
  borderRadius: 6,
  color: colors.text,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [mq[0]]: {
    width: '90%',
  },
  [mq[1]]: {
    width: '47%',
  },
  [mq[2]]: {
    width: '31%',
  },
  height: 380,
  margin: 10,
  overflow: 'hidden',
  position: 'relative',
  ':hover': {
    backgroundColor: colors.pink.lightest,
  },
  ':hover img': {
    transform: 'scale(1.3)',
    transition: 'all .3s ease-out',
  },
  cursor: 'pointer',
  textDecoration: 'none',
});

const CardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
});

const CardTitle = styled.h3({
  textAlign: 'center',
  fontSize: '1.4em',
  lineHeight: '1em',
  fontWeight: 700,
  color: colors.text,
  flex: 1,
});

const ColorOverlay = styled.div({
  background: 'rgba(250,0,150,0.20)',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 3,
});

const CardImageContainer = styled.div({
  height: '220px',
  position: 'relative',
  overflow: 'hidden',
  objectFit: 'cover',
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});

const CardImage = styled.img({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  filter: 'grayscale(60%)',
});

const CardBody = styled.div({
  padding: 18,
  flex: 1,
  display: 'flex',
  color: colors.textSecondary,
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const CardFooter = styled.div({
  display: 'flex',
  flexDirection: 'Row',
});

const AuthorImageContainer = styled.div({
  height: 30,
  width: 30, 
  marginRight: 8,
  objectFit: 'cover',
  borderRadius: '50%', 
  overflow: 'hidden'
})

const AuthorImage = styled.img({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});

const AuthorAndTrack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AuthorName = styled.div({
  lineHeight: '1em',
  fontSize: '1.1em',
});

const TrackLength = styled.div({
  fontSize: '0.8em', 
});
