import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LANGUAGES = ['fr', 'be', 'us', 'gb'];
const CATEGORY_WITH_ICON = ['business', 'general', 'sports'];

function ScreenSource() {
  const {user} = useParams();
  const [sourceList, setSourceList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  // const user = useSelector(state => state.user);
  console.log(user);

  useEffect(() => {
    console.log(user);
    fetch(`/load-source?user=${user}`)
      .then(response => response.json())
      .then(data => setSourceList(data.sources));
  }, [])

  useEffect(() => {
    console.log(user);
    fetch(`/load-source?user=${user}`)
      .then(response => response.json())
      .then(data => setSourceList(data.sources));
  } , [selectedLanguage])

  const handleClickFlag = async (language) => {
    setSelectedLanguage(language);
    fetch(`/change-language/${user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=${language}`
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
  }

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
      onClick={() => handleClickFlag(language)}
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
