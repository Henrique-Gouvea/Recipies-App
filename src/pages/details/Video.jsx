import React from 'react';
import { arrayOf, shape } from 'prop-types';
import { getVideoID } from '../../services/utilities';

function Video({ value }) {
  const { details } = value;
  return (
    <div>
      { details.strMeal
        ? (
          <iframe
            data-testid="video"
            width="360"
            src={ `https://www.youtube.com/embed/${getVideoID(details.strYoutube)}` }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        ) : null }
    </div>
  );
}

Video.propTypes = {
  value: arrayOf(shape()),
}.isRequired;

export default Video;
