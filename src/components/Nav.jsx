import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getTopics } from '../utils/api';
import { ArticlesList } from './ArticlesList';

export function Nav() {
  const [topics, setTopics] = useState([]);
  const [pickedTopic, setPickedTopic] = useState('')

  const handleClick = (clickedTopic) => {
    setPickedTopic(clickedTopic);
  };

  useEffect (() => {
    getTopics().then((topicsApi) => {
      setTopics(topicsApi);
    })
  }, []);


  return (
    <>
    <div className='nav'>
    <ul className='nav_topics_ul'>
    {topics.map((topic) => {
      return <li onClick={() => handleClick(topic.slug)} className='nav_topics_li'>{topic.slug}</li>
    })}
    </ul>
    </div>
    <ArticlesList topic={pickedTopic}/>
    </>
  );

}

