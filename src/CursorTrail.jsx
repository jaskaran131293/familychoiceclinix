import { useEffect } from 'react'

export default function CursorTrail() {
    useEffect(() => {
        const circles = []
        let mouseX = 0
        let mouseY = 0
        let animationId = null

        const createCircle = (x, y) => {
            const circle = document.createElement('div')
            circle.className = 'cursor-circle'
            circle.style.left = x + 'px'
            circle.style.top = y + 'px'
            circle.style.opacity = '1'
            circle.style.transform = 'translate(-50%, -50%)'
            document.body.appendChild(circle)

            circles.push({
                x: x,
                y: y,
                el: circle,
                life: 0,
                maxLife: 60,
            })
        }

        const animate = () => {
            circles.forEach((circle, i) => {
                circle.life += 1
                circle.x += (mouseX - circle.x) * 0.12
                circle.y += (mouseY - circle.y) * 0.12

                const opacity = Math.max(0, 1 - circle.life / circle.maxLife)
                const scale = Math.max(0, 1 - circle.life / circle.maxLife)

                circle.el.style.opacity = opacity
                circle.el.style.transform = `translate(-50%, -50%) scale(${scale})`
                circle.el.style.left = circle.x + 'px'
                circle.el.style.top = circle.y + 'px'

                if (circle.life >= circle.maxLife) {
                    circle.el.remove()
                    circles.splice(i, 1)
                }
            })

            if (circles.length > 0) {
                animationId = requestAnimationFrame(animate)
            }
        }

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Reduce frequency of circle creation - only 10% of mousemove events
            if (Math.random() > 0.9 && circles.length < 15) {
                createCircle(mouseX, mouseY)
                if (circles.length > 0 && !animationId) {
                    animationId = requestAnimationFrame(animate)
                }
            }
        }

        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            circles.forEach((c) => c.el.remove())
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [])

    return null
}
