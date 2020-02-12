import React, { FunctionComponent, useEffect, useState } from 'react';
import { config } from '../../config';


const Rules: FunctionComponent = () => {
  const [content, setContent] = useState<string | null >(null);

  useEffect(() => {
    fetch(config.directus + '/paff/items/page?filter[title][like]=Règles')
      .then(response => response.json())
      .then((rules) => {
        setContent(rules.data[0].content);
      });
  }, []);

  return (
    <div style={{
      width:'60%',
      margin: 'auto'
      }}>
      <h1>Les règles</h1>

      {content ?

        <div 
          dangerouslySetInnerHTML= {{ __html: content }} />
        : null
      }
    </div>
  );
}

export default Rules;