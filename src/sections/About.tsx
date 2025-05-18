import React from 'react';
import SectionTitle from '../components/SectionTitle';

// Hardcoded timeline events for accuracy
const timelineEvents = [
  {
    id: 1,
    year: 1962,
    title: "Born in Queens, New York",
    description: "John Alite was born on September 30, 1962, in Woodhaven, Queens, to Albanian immigrant parents from Gjirokastër, growing up in a gritty neighborhood that shaped his early life.",
  },
  {
    id: 2,
    year: 1980,
    title: "Joined the Gambino Crime Family",
    description: "In the early 1980s, John became a top earner for the Gambino crime family under John Gotti, earning the nickname 'The Calculator' for his strategic mind, though his Albanian heritage barred him from being a 'made man.'",
  },
  {
    id: 3,
    year: 2004,
    title: "Arrested in Brazil",
    description: "After years on the run, John was arrested in 2004 in Brazil, enduring brutal conditions in notorious prisons, a pivotal moment that began his path to redemption.",
  },
  {
    id: 4,
    year: 2008,
    title: "Cooperated with Authorities",
    description: "In 2008, John Alite, a former Gambino enforcer, cooperated with the government after learning, while imprisoned in Brazil’s brutal concentration camps for nearly three years, that Bonanno and Gambino bosses, captains, and 60 associates were secretly working with the FBI against him. This betrayal, discovered five years prior, led him to plead guilty to charges including six murders in 2006 and testify against John Gotti Jr., securing a reduced sentence and release in 2012 after 14 years.",
  },
  {
    id: 5,
    year: 2012,
    title: "Released from Prison",
    description: "John was released in 2012, beginning a journey of redemption by dedicating his life to mentoring at-risk youth and sharing his story to prevent others from following his past path.",
  },
  {
    id: 6,
    year: 2015,
    title: "Published 'Gotti's Rules'",
    description: "John authored 'Gotti's Rules: The Story of John Alite, Junior Gotti, and the Demise of the American Mafia,' a bestseller that offered an insider's perspective on organized crime.",
  },
  {
    id: 7,
    year: 2015,
    title: "Began Supporting Donald Trump",
    description: "John started supporting Donald Trump in 2016, meeting him five times, including at Mar-a-Lago, and began campaigning for him while discussing politics on his platforms.",
  },
  {
  "id": 8,
  "year": 2018,
  "title": "Published Darkest Hour",
  "description": "In 2018, John Alite, with S.C. Pike, published 'Darkest Hour,' a biography detailing his childhood and early life, marking his mission to dispel the mystique of the mafia and inspire others to avoid a life of crime."
},
  {
  "id": 9,
  "year": 2018,
  "title": "Released The Perfect Gangster",
  "description": "In 2018, the documentary 'The Perfect Gangster,' directed by Andy Deliana, was released, featuring John Alite, a former Gambino crime family associate, as he shares his violent past and journey toward redemption, exploring the essence of the gangster lifestyle in New York."
},
  {
    id: 10,
    year: 2019,
    title: "Published 'Prison Rules'",
    description: "John released 'Prison Rules,' sharing raw insights from his 14 years behind bars, further establishing himself as a notable author on crime and redemption.",
  },
  {
    id: 11,
    year: 2020,
    title: "Featured in Netflix's 'Fear City' and Published 'Darkest Hour'",
    description: "John appeared in Netflix's 'Fear City: New York vs The Mafia,' providing insights into the Gambino family, and published 'Darkest Hour,' reflecting on his life's darkest moments.",
  },
  {
    id: 12,
    year: 2021,
    title: "Published 'Mafia International'",
    description: "John authored 'Mafia International,' exploring the global reach of organized crime, adding to his growing legacy as a bestselling author.",
  },
  {
    id: 13,
    year: 2022,
    title: "Daughter Chelsea's Death from Fentanyl",
    description: "On August 18, 2022, John's daughter Chelsea, aged 30, died from a fentanyl-laced Percocet overdose, leaving behind her son Brayden. This tragedy fueled John's fight against the fentanyl crisis.",
  },
  {
    id: 14,
    year: 2023,
    title: "Featured in Netflix's 'Get Gotti' and Published 'The Perfect Gangster'",
    description: "John appeared in Netflix's 'Get Gotti,' sharing his testimony against Gotti Jr., and published 'The Perfect Gangster,' his fifth book, cementing his status as a crime expert.",
  },
  {
    id: 15,
    year: 2025,
    title: "Sworn in as Councilman in Englishtown, NJ",
    description: "On March 12, 2025, John was sworn in as a councilman in Englishtown, New Jersey, focusing on combating the drug epidemic through community programs and advocacy. With John Alite, you never know what's next—his journey continues to inspire and evolve.",
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-dark-gray grain-texture">
      <div className="container">
        <SectionTitle 
          title="About John Alite" 
          subtitle="From Gambino enforcer to a global voice of redemption and justice."
          alignment="left"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-gray-300 mb-6">
              John Alite, born to Albanian parents in Queens, New York, became a notorious Gambino crime family associate in the 1980s and 1990s. Known as "The Calculator" and described by FBI agent Ted Otto as a "hybrid gangster," Alite was a top earner under John Gotti and Gotti Jr., involved in six murders, drug trafficking, and racketeering. After 14 years in prison, including time in brutal Brazilian facilities, he turned his life around following his release in 2012, becoming a beacon of redemption.
            </p>
            <p className="text-gray-300">
              Today, John is a councilman in Englishtown, NJ, sworn in on March 12, 2025, and a bestselling author of five books: <em>Gotti's Rules</em> (2015), <em>Prison Rules</em> (2019), <em>Darkest Hour</em> (2020), <em>Mafia International</em> (2021), and <em>The Perfect Gangster</em> (2023). He has appeared in Netflix documentaries <em>Fear City: New York vs The Mafia</em> (2020) and <em>Get Gotti</em> (2023), as well as on <em>60 Minutes</em> and <em>Dateline NBC</em>. John hosts the podcast <em>The Mob, The Mafia, and The MAN</em>, advocating against the fentanyl crisis—fueled by the 2022 death of his daughter Chelsea—and has been a Trump supporter since 2016, meeting him multiple times.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img 
              src="https://media.zenfs.com/en/ny_post_metro_articles_178/8acd81446e0d61fa4719e37bcf91e912" 
              alt="John Alite reflecting on his journey of redemption" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-primary font-heading text-xl">John Alite</p>
              <p className="text-white text-sm">Former Mob Enforcer, Councilman, Bestselling Author, Speaker, Advocate, Media Personality, Podcaster</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">The Journey of John Alite</h3>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 md:block hidden"></div>
            
            {/* Mobile timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/30 md:hidden"></div>
            
            {/* Timeline events */}
            <div className="space-y-8 relative">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } items-center md:items-start gap-4 md:gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10 shadow-red-glow"></div>
                  
                  {/* Content */}
                  <div className={`flex-1 w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                  }`}>
                    <div className={`card p-6 hover:shadow-red-glow transition-shadow duration-300 ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}>
                      <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                      <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;