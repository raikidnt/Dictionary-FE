import React from "react";
import Autocomplete from "./Autocomplete";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Content = ({
  inpWord,
  setInpWord,
  randomWord,
  wordData,
  error,
  isLoading,
  handleSearchWord,
  suggestions,
  onSelectSuggestion,
  TOEFL,
  IELTS,
  favorites,
  handleAddToFavorites,
  handleRemoveFromFavorites,
  userSearchHistory,
  handleClearUserSearchHistory
}) => {
  const blurResultWord = () => {
    var wordMeaning = document.getElementsByClassName("result-word");
    for (var i = 0; i < wordMeaning.length; i++) {
      if (wordMeaning[i].style.backgroundColor === "black") {
        wordMeaning[i].style.backgroundColor = "";
      } else {
        wordMeaning[i].style.backgroundColor = "black";
      }
    }
  };
  const blurResultDefinition = () => {
    var wordMeaning = document.getElementsByClassName("result-definition");
    for (var i = 0; i < wordMeaning.length; i++) {
      if (wordMeaning[i].style.backgroundColor === "black") {
        wordMeaning[i].style.backgroundColor = "";
      } else {
        wordMeaning[i].style.backgroundColor = "black";
      }
    }
  };
  const onSubmitSearch = (event) => {
    event.preventDefault();
    handleSearchWord(inpWord);
  };

  const handleClickHistory = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };

  const handleClickFavorites = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };
  
  const handleClickIELTS = (lemma) => {
    handleSearchWord(lemma);
  };
  const handleClickTOEFL = (lemma) => {
    handleSearchWord(lemma);
  };

  return (
    <div className="dictionary-app">
      <header className="header">
        <p>
          BITS <span>- English Dictionary</span>
        </p>
        <button className="au-button">
          <a href="/">Logout</a>
        </button>
      </header>

      <form className="search-box" onSubmit={onSubmitSearch}>
        <Autocomplete
          suggestions={suggestions}
          value={inpWord}
          onChange={(value) => setInpWord(value)}
          onSelect={onSelectSuggestion}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {/* Display Main Tabs*/}
      <div className="cross-section">
        <div className="half-left-section">
          {/*Tabs */}
          <Tabs>
            <TabList className={"MainTabs"}>
              <Tab>Search History</Tab>
              <Tab>TOEFL</Tab>
              <Tab>IELTS</Tab>
              <Tab>Favorite</Tab>
            </TabList>

            <TabPanel>
              <div className="history-section">
                {userSearchHistory.length > 0 ? (
                  <div className="search-history-section">
                    <h2>User Search History</h2>
                    <ul>
                      {userSearchHistory.map((term, index) => (
                        <li key={index} onClick={() => handleClickHistory(term)}>
                          {term}
                        </li>
                      ))}
                    </ul>
                    <button onClick={handleClearUserSearchHistory}>Clear History</button>
                  </div>
                ) : (
                  <p>No search history found.</p>
                )}
              </div>
            </TabPanel>

            <TabPanel>
              {/* Display TOEFL */}
              {TOEFL && TOEFL.length > 0 && (
                <div className="search-history-section">
                  <h2>TOEFL</h2>
                  <ul>
                    {TOEFL.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickTOEFL(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {/* Display IELTS */}
              {IELTS && IELTS.length > 0 && (
                <div className="search-history-section">
                  <h2>IELTS</h2>
                  <ul>
                    {IELTS.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickIELTS(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              <div className="favorites-section">
                {favorites.length > 0 && (
                  <div className="search-history-section">
                    <h2>Favorites</h2>
                    <ul>
                      {favorites.map((term, index) => (
                        <li key={index}>
                          <span onClick={() => handleClickFavorites(term)}>{term}</span>
                          <button onClick={() => handleRemoveFromFavorites(term)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <div className="half-right-section">
          <h2>Search Results</h2>
          <div className="search-results-container">
            {error && <div className="error">{error}</div>}
            {wordData && (
              <div className="search-results-box">
                <div className="result-header">
                  <h2 className="result-word">{wordData.lemma}</h2>
                  {/* Audio will be put here later */}
                </div>
                <div className="meaning">
                  <h5 className="result-definition">{wordData.definition}</h5>
                  <h5>
                    <span className="syn">
                      Synonyms:{" "}
                      {wordData.synonyms ? (
                        wordData.synonyms &&
                        wordData.synonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched synonyms"</p>
                      )}
                    </span>
                  </h5>
                  <h5>
                    <span className="ant">
                      Antonyms:{" "}
                      {wordData.antonyms ? (
                        wordData.antonyms &&
                        wordData.antonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched antonyms"</p>
                      )}
                    </span>
                  </h5>
                </div>
              </div>
            )}
            <div className="blur-buttons">
              {" "}
              <button className="au-button" onClick={blurResultWord}>
                Blur Word
              </button>
              <button className="au-button" onClick={blurResultDefinition}>
                Blur Definition
              </button>
              <button className="au-button" onClick={handleAddToFavorites}>
                Add to Favorites
              </button>
            </div>
          </div>
          <br></br>
          <div className="todays-sentence">
            <h2>Today's Sentence</h2>
            {/* Check if randomWord is defined before trying to access its properties */}
            <p>
              {randomWord
                ? `${randomWord.lemma}: ${randomWord.definition}`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">© 2023 Bitsdictionary.com</footer>
    </div>
  );
};

export default Content;
