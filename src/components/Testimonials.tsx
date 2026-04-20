import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Kalibre transformed how we hire engineering talent. Time-to-fill dropped by 40% in our first quarter.",
    name: "Sarah Jenkins",
    title: "Head of Talent, TechFlow",
    avatar: "S"
  },
  {
    quote: "As a candidate, the experience was seamless. I was matched with three perfect roles within 48 hours.",
    name: "David Chen",
    title: "Senior Product Manager",
    avatar: "D"
  },
  {
    quote: "The analytics dashboard gives us unprecedented insights into our hiring pipeline bottlenecks.",
    name: "Marcus Thorne",
    title: "VP of People, SynergyLabs",
    avatar: "M"
  },
  {
    quote: "An absolute game-changer. The platform's automated sourcing feels like having a team of recruiters working 24/7.",
    name: "Emily Vance",
    title: "Founder, Horizon AI",
    avatar: "E"
  },
  {
    quote: "I've never seen such accurate role-matching. It completely eliminates the noise from standard job boards.",
    name: "Tyler Reed",
    title: "Frontend Developer",
    avatar: "T"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white border-y border-black/[0.03] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black">
          Trusted by top talent and elite organizations.
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex space-x-6 animate-marquee whitespace-nowrap py-4">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div
              key={idx}
              className="inline-block w-[350px] whitespace-normal glass-peak border border-black/[0.03] rounded-3xl p-8 shrink-0 shadow-sm"
            >
              <Quote className="text-brand-red/20 w-10 h-10 mb-4" />
              <p className="text-brand-black font-medium text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-black">{testimonial.name}</h4>
                  <p className="text-xs text-brand-grey">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
