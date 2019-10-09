import React, { Component } from 'react'
import styled from 'styled-components'
import Container from '../Grid/Container'
import Grid from '../Grid/Grid'
import meta from '../../constants/meta.json'
import { getInstagramFeedInfo } from 'origen-react-instagram-feed'
import { Link } from 'react-router-dom'
import SEO from '../SEO/SiteSeo'
import InstaLoader from './InstaLoader'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'

/*************************/
/********* CSS ***********/
/*************************/
const StyledPortfolio = styled.div`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500,600&display=swap');
  font-family: ${props => props.theme === 'philippe' && "'IBM Plex Sans', sans - serif"};
  background: ${props => props.theme === 'philippe' && '#dbd0c4'};
  color: ${props => props.theme === 'philippe' && '#232323'};
  header {
    width: 100%;
    padding: 1.5rem 0;
    div {
      position: fixed;
      h1 {
        font-size: 1.375rem;
        line-height: 1.25;
        font-weight: 600;
        color: ${props => props.theme === 'philippe' && '#232323'};
      }
      h3 {
        font-size: 1.125rem;
        color: ${props => props.theme === 'philippe' && '#a79a8d'};
        font-weight: 500;
      }
    }
  }
  .portfolio {
    margin-top: 6.5rem;
    h2 {
      line-height: 1.25;
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.475;
      font-weight: 500;
    }
    img {
      width: 100%;
    }
  }
  main {
    margin-top: 3rem;
    align-self: flex-start;
    width: 100%;
    section {
      align-self: baseline;
      h2 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
      }
      ul {
        li {
          list-style: none;
          margin-bottom: 1rem;
          h3 {
            font-size: 1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            span {
              padding-left: 0.5rem;
            }
          }
          h4 {
            font-size: 0.875rem;
            opacity: 0.475;
            font-weight: 600;
          }
          p {
            font-size: 0.875rem;
          }
          :last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  footer {
    width: 100%;
    padding: 1.5rem 0;
    margin-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.075);
    div {
      min-width: 50%;
    }
  }
  @media (min-width: 992px) {
    main {
      margin-top: 4rem;
    }
    .portfolio {
      display: grid;
      grid-template-columns: 30% 70%;
      grid-gap: 3rem;
    }
    footer {
      div {
        min-width: initial;
      }
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class PortfolioInfo extends Component {
  state = {
    instagramFeed: undefined
  }

  setInstagramData = async username => {
    const instagramFeed = await getInstagramFeedInfo(username)
    this.setState({ instagramFeed })
  }

  componentDidMount() {
    const { username } = this.props.profile.instagram
    username && this.setInstagramData(username)
  }

  render() {
    const { name, headline, about, education, experience } = this.props.profile.linkedIn.profile
    const { instagram, linkedIn } = this.props.profile
    const { instagramFeed } = this.state

    return (
      <StyledPortfolio theme='philippe'>
        <SEO title={name} description={about} />
        <Container type='portfolio-fullheight'>
          {/* Header */}
          <header>
            <div>
              <h1>{name}</h1>
              <h3>{headline}</h3>
            </div>
          </header>
          {/* Portfolio */}
          <section className='portfolio'>
            {/* About */}
            <div>
              <h2>{about}</h2>
            </div>
            {/* Instagram */}
            {instagram.username && (
              <Grid sm={1} md={2} spacing='5rem'>
                {!instagramFeed ? (
                  <>
                    <InstaLoader primaryColor='#cabaa8' secondaryColor='#c1b19e' />
                    <InstaLoader primaryColor='#cabaa8' secondaryColor='#c1b19e' />
                    <InstaLoader primaryColor='#cabaa8' secondaryColor='#c1b19e' />
                    <InstaLoader primaryColor='#cabaa8' secondaryColor='#c1b19e' />
                  </>
                ) : (
                  instagramFeed.media.map(post => (
                    <img key={post.id} src={post.displayImage} alt={post.accessiblityCaption} />
                  ))
                )}
              </Grid>
            )}
          </section>
          {/* LinkedIn Info */}
          <main>
            <Grid sm={1} md={3} spacing='3rem'>
              {/* Experience */}
              <section>
                <h2>Experiencia</h2>
                <ul>
                  {experience.map(({ _id, position, company, dateRange }) => (
                    <li key={_id}>
                      <h3>{position}</h3>
                      <h4>{company}</h4>
                      <p>
                        {dateRange.start} - {dateRange.end || 'Actualidad'}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Education */}
              <section>
                <h2>Educación</h2>
                <ul>
                  {education.map(({ _id, school, studies, dateRange }) => (
                    <li key={_id}>
                      <h3>{studies}</h3>
                      <h4>{school}</h4>
                      <p>
                        {dateRange.start} - {dateRange.end || 'Now'}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2>Contact</h2>
                <ul>
                  <li>
                    <a target='_blank' rel='noopener noreferrer' href={`https://linkedin.com/in/${linkedIn.username}`}>
                      <h3>
                        <FaLinkedinIn /> <span>LinkedIn</span>
                      </h3>
                    </a>
                  </li>
                  <li>
                    <a target='_blank' rel='noopener noreferrer' href={`https://instagram.com/${instagram.username}`}>
                      <h3>
                        <FaInstagram /> <span>Instagram</span>
                      </h3>
                    </a>
                  </li>
                </ul>
              </section>
            </Grid>
          </main>
          {/* Footer */}
          <footer>
            <div>
              <small>
                &copy; {new Date().getFullYear()} {name}
              </small>
            </div>
            <div>
              <Link to='/'>
                <small>Made with {meta.name}</small>
              </Link>
            </div>
          </footer>
        </Container>
      </StyledPortfolio>
    )
  }
}
