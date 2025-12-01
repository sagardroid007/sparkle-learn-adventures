import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CourseCard } from '@/components/CourseCard';
import { AIHelper } from '@/components/AIHelper';
import mathImg from '@/assets/math-adventure.jpg';
import scienceImg from '@/assets/science-quest.jpg';
import englishImg from '@/assets/english-fun.jpg';

export default function Courses() {
  const courses = [
    {
      id: 'math-adventure',
      title: 'Math Adventure 🔢',
      description: 'Explore numbers and solve fun problems!',
      image: mathImg,
      color: '#60A5FA',
    },
    {
      id: 'science-quest',
      title: 'Science Quest 🔬',
      description: 'Discover amazing scientific wonders!',
      image: scienceImg,
      color: '#34D399',
    },
    {
      id: 'english-fun',
      title: 'English Fun 📚',
      description: 'Learn words and stories together!',
      image: englishImg,
      color: '#F472B6',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-black text-primary mb-4">
              Choose Your Adventure! 🎯
            </h1>
            <p className="text-2xl text-muted-foreground font-bold">
              Pick a course and start learning!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AIHelper />
    </div>
  );
}
