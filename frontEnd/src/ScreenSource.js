import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const LANGUAGES = ['fr', 'be', 'us', 'gb'];
const CATEGORY_WITH_ICON = ['business', 'general', 'sports'];

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  useEffect(() =>{
    const loadSources = async () => {
      const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?country=${selectedLanguage}&apiKey=00eb781fbc674c2185c39fc309988ef3`);
      const { sources } = await response.json();
      setSourceList(sources);
    }
    loadSources();
  } , [selectedLanguage])

  const languageFlags = LANGUAGES.map(language => {
    let classes = 'language_flags';
    if (selectedLanguage === language){
      classes += ' selected_language';
    }
    return <img
      key={`flag-${language}`}
      className={classes}
      src={`../images/${language}.png`} 
      alt={`language-${language}`}
      onClick={() => {setSelectedLanguage(language)}}
    />
  })


  return (
    <div>
        <Nav/>

        <div className="Banner">
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            {languageFlags}
          </div>
        </div>

        <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={({id, name, description, category}) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`../images/${CATEGORY_WITH_ICON.includes(category)? category : 'general'}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${id}`}>{name}</Link>}
                        description={description}
                      />
                    </List.Item>
                  )}
                />


          </div>

      </div>
  );
}

export default ScreenSource;
