import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getTopics } from '../utils/api';
import { ArticlesList } from './ArticlesList';

export function Nav() {
  const [topics, setTopics] = useState([]);
  const [pickedTopic, setPickedTopic] = useState('');

  const handleClick = (clickedTopic) => {
    setPickedTopic(clickedTopic);
  };

  useEffect (() => {
    getTopics().then((topicsApi) => {
      setTopics(topicsApi);
    })
  }, [pickedTopic]);

  return (
    <>
    <div className='nav'>
    <ul className='nav_topics_ul'>
      <li onClick={() => handleClick('')} className='nav_topics_li'>All</li>
    {topics.map((topic) => {
      return <li key={topic.slug} onClick={() => handleClick(topic.slug)} className='nav_topics_li'>{topic.slug}</li>
    })}
    </ul>
    </div>
    <ArticlesList topic={pickedTopic}/>
    </>
  );

}

