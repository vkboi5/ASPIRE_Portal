import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, MessageCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

// Mock Chat Bot component
const ChatBot = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.8 }} 
    className="fixed bottom-10 right-10 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4"
  >
    <div className="flex justify-between items-center mb-2 bg-yellow-200 p-2 rounded-lg">
      <h4 className="text-lg font-semibold">ASPIRE Support Bot</h4>
      <XCircle onClick={onClose} className="cursor-pointer h-6 w-6 text-gray-400 hover:text-gray-600" />
    </div>
    <div className="p-2 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-700">Hi! How can I assist you today?</p>
    </div>
  </motion.div>
)

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null)
  const [chatBotOpen, setChatBotOpen] = useState(false)

  const faqs = [
    { 
      question: "What documents are required for AYUSH startup registration?", 
      answer: "Required documents typically include business plan, financial projections, founder's ID proof, and relevant AYUSH certifications." 
    },
    { 
      question: "How long does the registration process take?", 
      answer: "The registration process usually takes 4-6 weeks, depending on the completeness of your application and document submission." 
    },
    { 
      question: "Can I track my application status?", 
      answer: "Yes, you can track your application status through the dashboard on the AYUSH Startup Registration Portal." 
    },
    { 
      question: "What support does AYUSH provide after registration?", 
      answer: "AYUSH provides mentorship, networking opportunities, and potential funding connections for registered startups." 
    },
  ]

  return (
    <div className="container mx-auto p-6 bg-yellow-50">
      <Card className="w-full max-w-3xl mx-auto border border-yellow-700 shadow-lg bg-yellow-100">
        <CardHeader className="bg-yellow-600 text-white p-4 rounded-t-md">
          <CardTitle>Help Center</CardTitle>
          <CardDescription className="text-sm text-white">Find answers to common questions or get in touch with our support team.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-10 border-2 border-yellow-700" placeholder="Search for help" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-700">Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-yellow-700 rounded-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-yellow-50 hover:bg-yellow-100"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFaq === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-gray-50"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="bg-yellow-100 border border-yellow-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Need more help?</h3>
            <p className="mb-4">Our support team is always ready to assist you.</p>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={() => setChatBotOpen(!chatBotOpen)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {chatBotOpen ? "Close Chat" : "Contact Support"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {chatBotOpen && <ChatBot onClose={() => setChatBotOpen(false)} />}
    </div>
  )
}
