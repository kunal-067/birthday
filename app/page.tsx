"use client"

import { useState, useEffect } from "react"

interface Heart {
  id: number
  left: number
  delay: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const generateHearts = () => {
      const newHeart: Heart = {
        id: nextId,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
      }
      setHearts((prev) => [...prev, newHeart])
      setNextId((prev) => prev + 1)

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 3000)
    }

    const interval = setInterval(generateHearts, 200)
    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up text-4xl"
          style={{
            left: `${heart.left}%`,
            bottom: "-10%",
            animationDelay: `${heart.delay}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}

function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticle = () => {
      const newParticle: Particle = {
        id: Math.random(),
        x: Math.random() * 200 + 15,
        y: -3,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 3 + 4,
      }
      setParticles((prev) => [...prev, newParticle])

      setTimeout(
        () => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
        },
        (newParticle.duration + 1) * 1000,
      )
    }

    const interval = setInterval(createParticle, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle-fall rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(212,105,122,0.6), rgba(212,105,122,0))`,
            animation: `particle-fall ${p.duration}s linear forwards`,
          }}
        />
      ))}
    </div>
  )
}

function AnimatedGallery() {
  const images = [
    { emoji: "✨", color: "from-[#e8d5e3] to-[#f5e6e1]" },
    { emoji: "🌸", color: "from-[#fdd6d6] to-[#f5e6e1]" },
    { emoji: "💕", color: "from-[#f5d5e3] to-[#ffe6d5]" },
    { emoji: "🌷", color: "from-[#e6d5f5] to-[#f5e6e1]" },
    { emoji: "🦋", color: "from-[#d5f5e6] to-[#f5e6d5]" },
    { emoji: "🌙", color: "from-[#e6e6f5] to-[#f5e6e1]" },
    { emoji: "💫", color: "from-[#f5e6d5] to-[#e6f5d5]" },
    { emoji: "🌺", color: "from-[#f5d5d5] to-[#ffe6d5]" },
    { emoji: "🎀", color: "from-[#fdd6d6] to-[#f5d5e3]" },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`aspect-square bg-gradient-to-br ${img.color} rounded-lg flex items-center justify-center text-4xl md:text-5xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-125 hover:rotate-6 hover:z-50 animate-gallery-pop cursor-pointer group`}
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          <div className="group-hover:animate-spin-slow group-hover:scale-150 transition-all duration-300">
            {/* {img.emoji} */}
            <img src={`/img-${idx+1}.jpeg`} alt="" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Confetti() {
  const [confetti, setConfetti] = useState<any[]>([])

  useEffect(() => {
    const generateConfetti = () => {
      const newConfetti = Array.from({ length: 8 }, (_, i) => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: Math.random() * 2 + 2.5,
      }))
      setConfetti((prev) => [...prev, ...newConfetti])

      setTimeout(() => {
        setConfetti((prev) => prev.filter((c) => c.id !== newConfetti[newConfetti.length - 1].id))
      }, 3500)
    }

    const interval = setInterval(generateConfetti, 300)
    return () => clearInterval(interval)
  }, [])

  const emojis = ["🎉", "✨", "💖", "🌸"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute text-2xl md:text-3xl animate-confetti"
          style={{
            left: `${c.left}%`,
            top: "-5%",
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </div>
      ))}
    </div>
  )
}

export default function BirthdayPage() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <main className="bg-gradient-to-b from-[#faf8f3] via-[#fef5f0] to-[#f9f1f0] min-h-screen overflow-hidden">
      <ParticleBackground />
      <CursorHeartTrail />
      {showHearts && <FloatingHearts />}
      {showConfetti && <Confetti />}

      {/* Hero Section - Minimal text, max animation */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-bounce-in">
            <div className="text-8xl md:text-9xl animate-float-large">💕</div>
          </div>

          <h1
            className="text-5xl glow-h1 md:text-7xl font-bold mb-4 text-[#d4697a] animate-slide-down"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Happy Birthday
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-[#d4697a] to-[#d4c5d8] mx-auto mb-8 animate-expand" />

          <div className="flex justify-center gap-6 mb-12">
            <div className="text-5xl animate-bob" style={{ animationDelay: "0s" }}>
              💖
            </div>
            <div className="text-5xl animate-bob" style={{ animationDelay: "0.2s" }}>
              🌸
            </div>
            <div className="text-5xl animate-bob" style={{ animationDelay: "0.4s" }}>
              ✨
            </div>
          </div>

          <p className="text-lg md:text-xl text-[#8b6d6d] animate-fade-in-delayed max-w-md mx-auto">
            A moment just for you
          </p>
        </div>
      </section>

      {/* Gallery Section - Animated, visual-focused */}
      <section className="py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-6xl mb-4 animate-spin-slow">🌸</div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#d4697a] animate-slide-down"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Moments
            </h2>
          </div>
          <AnimatedGallery />
        </div>
      </section>

      {/* Interactive Elements Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: "💝", label: "Love" },
              { emoji: "🌟", label: "Wonder" },
              { emoji: "🎀", label: "Grace" },
              { emoji: "🌙", label: "Magic" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 cursor-pointer animate-scale-in group"
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                <div className="text-6xl mb-3 group-hover:animate-bounce-soft">{item.emoji}</div>
                <p className="text-[#d4697a] font-semibold text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surprise Section - Heavy animation focus */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#fef5f0] to-[#f9f1f0]">
        <div className="max-w-2xl mx-auto text-center">
          <button
            onClick={() => {
              setShowSurprise(!showSurprise)
              setShowHearts(!showHearts)
              setShowConfetti(!showConfetti)
            }}
            className="mb-12 px-8 py-4 bg-[#d4697a] hover:bg-[#c25869] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-125 active:scale-90 shadow-lg hover:shadow-2xl animate-pulse-glow text-lg"
          >
            ✨ {showSurprise ? "Hide" : "Reveal"} ✨
          </button>

          {showSurprise && (
            <div className="animate-pop-in space-y-8">
              <div className="bg-white/80 backdrop-blur rounded-lg p-8 md:p-12 shadow-lg">
                <p
                  className="text-3xl md:text-4xl text-[#d4697a] animate-fade-in"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  You Matter
                </p>
              </div>

              <div className="flex justify-center gap-4 animate-float">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                    💕
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Closing Section - Minimal, elegant */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#f9f1f0] to-[#faf8f3]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in-delayed">
            <div className="text-7xl animate-float mb-8">💕</div>
            <p className="text-2xl md:text-3xl text-[#6b5555]" style={{ fontFamily: "Great Vibes, cursive" }}>
              Happy Birthday
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}



function CursorHeartTrail() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const heart = document.createElement("div")
      heart.innerHTML = "💗"
      heart.className =
        "fixed pointer-events-none text-xl animate-cursor-heart z-50"
      heart.style.left = `${e.clientX}px`
      heart.style.top = `${e.clientY}px`

      document.body.appendChild(heart)

      setTimeout(() => {
        heart.remove()
      }, 1000)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return null
}
