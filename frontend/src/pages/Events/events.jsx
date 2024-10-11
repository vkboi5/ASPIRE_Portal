import { useEffect, useState } from 'react';
import { Calendar, Clock, FileText, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EventPage() {
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetching data for events and articles (Dummy data used here)
    setLiveEvents([
      { title: 'Government Startup Meet 2024', location: 'New Delhi', time: 'Live Now' },
      { title: 'Health Awareness Campaign', location: 'Mumbai', time: 'Live Now' },
    ]);
    
    setUpcomingEvents([
      { title: 'National Education Summit', date: '20th Oct 2024', location: 'Hyderabad' },
      { title: 'Clean India Drive', date: '25th Oct 2024', location: 'Bangalore' },
    ]);
    
    setPastEvents([
      { title: 'Green Energy Conference', date: '15th Sept 2024', location: 'Kolkata' },
      { title: 'Agricultural Expo 2024', date: '10th Sept 2024', location: 'Pune' },
    ]);

    setArticles([
      { title: 'Key Takeaways from the Startup Meet 2024', link: '#' },
      { title: 'How Government Initiatives are Shaping Innovation', link: '#' },
      { title: 'Highlights of the National Education Summit 2023', link: '#' },
    ]);
  }, []);

  return (
    <div className="p-8 bg-[#FDFEFE]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#34495E]">Government Event Page</h1>
        <p className="text-lg text-[#34495E] mt-2">Stay updated with the latest events, live sessions, and insightful articles.</p>
      </header>

      {/* Main Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Live Events */}
        <section className="lg:col-span-1">
          <Card className="bg-[#A9CCE3] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#34495E]">Live Events</CardTitle>
            </CardHeader>
            <CardContent>
              {liveEvents.map((event, index) => (
                <div key={index} className="border-b py-4">
                  <h3 className="text-lg font-bold text-[#5499C7]">{event.title}</h3>
                  <p className="text-sm text-[#34495E] flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> {event.location}
                  </p>
                  <p className="text-sm text-[#76D7C4] flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {event.time}
                  </p>
                  <Button variant="link" className="text-sm text-[#5499C7] mt-2">Join Live Event</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Events */}
        <section className="lg:col-span-2">
          <Card className="bg-[#A9CCE3] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#34495E]">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-b py-4">
                  <h3 className="text-lg font-bold text-[#5499C7]">{event.title}</h3>
                  <p className="text-sm text-[#34495E] flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {event.date}
                  </p>
                  <p className="text-sm text-[#34495E] flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> {event.location}
                  </p>
                  <Button variant="link" className="text-sm text-[#5499C7] mt-2">More Info</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Articles Section */}
        <section className="lg:col-span-3 mt-8">
          <Card className="bg-[#FDFEFE] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#34495E]">Articles & Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              {articles.map((article, index) => (
                <div key={index} className="border-b py-4">
                  <h3 className="text-lg font-bold text-[#5499C7]">{article.title}</h3>
                  <Button variant="link" className="text-sm text-[#5499C7] mt-2" href={article.link}>Read More</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Past Events Section */}
      <section className="mt-8">
        <Card className="bg-[#FDFEFE] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#34495E]">Past Events</CardTitle>
          </CardHeader>
          <CardContent>
            {pastEvents.map((event, index) => (
              <div key={index} className="border-b py-4">
                <h3 className="text-lg font-bold text-[#5499C7]">{event.title}</h3>
                <p className="text-sm text-[#34495E] flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> {event.date}
                </p>
                <p className="text-sm text-[#34495E] flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {event.location}
                </p>
                <Button variant="link" className="text-sm text-[#5499C7] mt-2">Event Summary</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
