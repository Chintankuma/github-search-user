import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    // console.log(language);
    return total;
  }, {});
  console.log("languages", languages);
  //now convert this object into array

  //most used per language
  const mostUsed = Object.values(languages) //give me only values of the object not key
    .sort((a, b) => {
      return b.value - a.value; //wit that i can sort most popular language first and then slice ich nur 5 langaueg
    })
    .slice(0, 5);
  //now i want to only 5 most popular languages thats why sort and slice
  console.log(mostUsed);

  //most star per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  //stars

  let stars = repos.reduce((total, item) => {
    const { stargazers_count, name } = item;
    total[stargazers_count] = { label: name, value: stargazers_count };
    return total;
  }, {});

  console.log(stars);
  const mostStars = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  // console.log(mostStars);

  //forks
  let forks = repos.reduce((total, item) => {
    const { name, forks } = item;
    total[forks] = { label: name, value: forks };
    return total;
  }, {});

  const mostForks = Object.values(forks)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  // console.log("forks", mostForks);

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData}></ExampleChart> */}
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={mostStars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={mostForks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
