import React from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

// Hardcoded media items with updated article for id: 5
const mediaItems = [
  {
    id: 1,
    source: "New York Post",
    logo: "https://cdn.brandfetch.io/iduV4Se_9U/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", // Replace with /images/nypost-logo.jpg
    title: "Ex-Gambino Mobster John Alite Now Councilman in Englishtown, New Jersey",
    excerpt: "John Alite, a former Gambino crime family enforcer, was sworn in as a councilman in Englishtown, NJ, on March 12, 2025, aiming to combat the drug epidemic after losing his daughter to fentanyl.",
    link: "https://nypost.com/2025/03/15/us-news/ex-gambino-mobster-john-alite-now-councilman-in-englishtown-new-jersey/",
  },
  {
    id: 2,
    source: "Daily Mail",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHP01Ba63KOosOWC1Xrm_6Ijz63pRaUUamA&s", // Replace with /images/dailymail-logo.jpg
    title: "Mob Enforcer John Alite Joins War Against Fentanyl After Daughter’s Death",
    excerpt: "Chelsea Alite, 30, died on August 18, 2022, from a fentanyl-laced Percocet, prompting her father, former Gambino enforcer John Alite, to advocate against the drug crisis.",
    link: "https://www.dailymail.co.uk/news/article-11379199/Mob-enforcer-John-Alite-joins-war-against-fentanyl-daughter-30-dies-overdose.html",
  },
  {
    id: 3,
    source: "The Independent",
    logo: "https://keepingchannelsopen.com/wp-content/uploads/2021/10/Theindependetsquare.png", // Replace with /images/independent-logo.jpg
    title: "New Trump Photo with Mobster John Alite Surfaces",
    excerpt: "A 2022 photo shows Donald Trump posing with John Alite, a former Gambino hitman turned podcaster, highlighting Alite’s support for Trump’s criminal justice reform efforts.",
    link: "https://www.independent.co.uk/news/world/americas/us-politics/trump-photo-mobster-john-alite-b2279297.html",
  },
  {
    id: 4,
    source: "New York Post",
    logo: "https://cdn.brandfetch.io/iduV4Se_9U/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", // Replace with /images/nypost-logo.jpg
    title: "Mafia Hitman Turned Pol John Alite Heckled at Town Hall by Ex-Junior Gotti Underling",
    excerpt: "On April 20, 2025, John Alite, now an Englishtown councilman, faced heckling from a former Gotti associate during a town hall, underscoring tensions from his mob past.",
    link: "https://nypost.com/2025/04/20/us-news/mafia-hitman-turned-pol-john-alite-heckled-at-town-hall-by-ex-junior-gotti-underling/",
  },
  {
    id: 5,
    source: "Shore News Network",
    logo: "https://media.publit.io/file/Shore-News-Network.jpeg", // Placeholder JPG; replace with /images/shorenewsnetwork-logo.jpg
    title: "Gambino Family Mob Enforcer Who Shot 40 People and Killed 6 Appointed to Town Council in New Jersey",
    excerpt: "John Alite, a former Gambino enforcer linked to 40 shootings and 6 murders, was appointed to the Englishtown, NJ, town council on March 12, 2025, sparking debate over his past.",
    link: "https://www.shorenewsnetwork.com/2025/03/20/gambino-family-mob-enforcer-who-shot-40-people-and-killed-6-appointed-to-town-council-in-new-jersey/",
  },
];

const Media: React.FC = () => {
  return (
    <section id="media" className="section bg-black grain-texture">
      <div className="container">
        <SectionTitle 
          title="In The Media" 
          subtitle="Making headlines across major publications."
          className="text-white" // Ensure title and subtitle are white
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mediaItems.map((item) => (
            <div key={item.id} className="card hover:shadow-red-glow transition-shadow duration-300">
              <div className="p-6">
                <div className="h-12 mb-4">
                  <img 
                    src={item.logo} 
                    alt={`${item.source} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white mb-4 text-sm">{item.excerpt}</p>
                <Button href={item.link} variant="primary" className="w-full text-white">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Media;