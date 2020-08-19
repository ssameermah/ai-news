import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import Cards from './components/Cards/Cards';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles.js';

const alanKey = '56ff02887c0122d143aa8f1a03047b892e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey, 
            onCommand: ({ command,articles, number }) => {
                if(command === 'newHeadlines') {  
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                     if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }


                }
            },
        });
    }, []); 

    return (
        <div>
            <div>
                <h1 className={classes.logoContainer}>WELCOME TO AI NEWS</h1>
            </div>
            <div className={classes.logoContainer}>
                
                {/* <img src="https://www.solidbackgrounds.com/images/950x350/950x350-black-solid-color-background.jpg" className={classes.alanLogo} alt="alan logo" /> */}
            </div>
            <Cards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App
