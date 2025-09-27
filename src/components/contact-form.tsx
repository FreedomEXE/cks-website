'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, CheckCircle2, AlertCircle, Loader2, Mail, User, Building2, Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
          setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            message: ''
          })
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.5
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="relative bg-background border rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

              <div className="relative p-8 md:p-10">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
                  >
                    Request a Demo
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-2 text-muted-foreground"
                  >
                    See how CKS can transform your contracting business
                  </motion.p>
                </div>

                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-muted-foreground">We&apos;ll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={cn(
                              "transition-all duration-200",
                              focusedField === 'name' && "ring-2 ring-primary/50"
                            )}
                            placeholder="John Doe"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={cn(
                            "transition-all duration-200",
                            focusedField === 'company' && "ring-2 ring-primary/50"
                          )}
                          placeholder="ACME Construction"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={cn(
                            "transition-all duration-200",
                            focusedField === 'email' && "ring-2 ring-primary/50"
                          )}
                          placeholder="john@example.com"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "transition-all duration-200",
                            focusedField === 'phone' && "ring-2 ring-primary/50"
                          )}
                          placeholder="(555) 123-4567"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        How can we help?
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className={cn(
                          "transition-all duration-200 resize-none",
                          focusedField === 'message' && "ring-2 ring-primary/50"
                        )}
                        placeholder="Tell us about your project and requirements..."
                      />
                    </motion.div>

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Something went wrong. Please try again.</span>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex gap-4"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 text-base font-medium relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Request
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-primary/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ type: "tween", duration: 0.3 }}
                        />
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="h-12 px-6 text-base font-medium"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}