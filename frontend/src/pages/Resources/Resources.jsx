import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock Data for Resources
const resources = [
  {
    title: "The Startup Guidebook",
    description: "The ultimate guide to starting a business in India.",
    link: "#",
    type: "PDF"
  },
  {
    title: "Online Courses For Entrepreneurs",
    description: "Curated courses to gain a competitive edge.",
    link: "#",
    type: "Link"
  },
  {
    title: "Market Research",
    description: "Stay ahead with our curated list of market reports.",
    link: "#",
    type: "Link"
  },
  {
    title: "Templates",
    description: "Sample pitch decks, tools, templates, contracts, and other resources.",
    link: "#",
    type: "PDF"
  },
  {
    title: "Startup India Blog",
    description: "Follow entrepreneurs exploring topics relevant to you.",
    link: "#",
    type: "Link"
  },
  {
    title: "Partnered Services",
    description: "Free corporate services for startups.",
    link: "#",
    type: "Link"
  },
]

const blogs = [
  { title: "How AgriTech Startups are Revolutionising Farming", date: "29 Feb 2024, Thursday", author: "Dr Anu Kadyan" },
  { title: "Growth through Learning with StartupShala", date: "11 Jan 2024, Thursday", author: "Startup India" },
  { title: "Startup Uncut with Mr Sanjeev Bikhchandani", date: "29 Dec 2023, Friday", author: "Startup India" },
  { title: "Brainstorming the Brainstorming: 7 Ways to Create", date: "05 Nov 2023, Sunday", author: "Startup India" }
]

export default function Resources() {
  return (
    <div className="container mx-auto p-6">
      {/* Main Resources Section */}
      <Card className="w-full max-w-4xl mx-auto border border-yellow-800 shadow-lg bg-yellow-50">
        <CardHeader className="bg-yellow-700 text-white p-4 rounded-t-md">
          <CardTitle>Resources for AYUSH Startups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">

          {/* Available Resources Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-800">Available Resources</h3>
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-yellow-800 rounded-md p-4 bg-white hover:bg-yellow-100 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-700">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resource.type === "PDF" ? (
                      <FileText className="text-yellow-700 h-6 w-6" />
                    ) : (
                      <ExternalLink className="text-yellow-700 h-6 w-6" />
                    )}
                    <a href={resource.link} className="text-yellow-700 underline hover:text-yellow-600 transition-colors">
                      {resource.type === "PDF" ? "Download" : "Visit"}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top Blogs Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-800">Top Blogs</h3>
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-yellow-800 rounded-md p-4 bg-white hover:bg-yellow-100 hover:shadow-md transition duration-300"
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-700">{blog.title}</h4>
                    <p className="text-sm text-gray-600">{blog.date}</p>
                    <p className="text-sm text-gray-600">By: {blog.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
