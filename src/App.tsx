import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import { motion, AnimatePresence } from 'framer-motion';
import { remixContent } from './api/remix';
import { FiCopy, FiCheck, FiCpu, FiServer } from 'react-icons/fi';

function App() {
  const [content, setContent] = useState('');
  const [style, setStyle] = useState('casual');
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const styles = [
    { value: 'casual', label: 'Neural Baseline' },
    { value: 'cybernetic', label: 'Cybernetic Enhancement' },
    { value: 'very-cybernetic', label: 'Neural Overdrive' },
    { value: 'extreme-cybernetic', label: 'Digital Ascension' }
  ];

  const handleRemix = async () => {
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const results = await Promise.all([
        remixContent(content, style),
        remixContent(content, 'cybernetic'),
        remixContent(content, 'very-cybernetic'),
      ]);
      setOutputs(results);
    } catch (error) {
      console.error('Neural interface disrupted:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen relative">
      <MatrixRain />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-white mb-4 glow-text font-cyber">
            Neural Content Synthesizer
          </h1>
          <p className="text-xl text-cyan-400 font-mono">
            [v2.0.45] Quantum-Enhanced Content Transformation Matrix
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FiCpu className="mr-2 text-cyan-400" />
              Neural Input Interface
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-cyan-400 mb-2 font-mono">Synthesis Protocol</label>
                <select 
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-black/50 text-white border border-cyan-500/30 rounded-lg p-3 font-mono"
                >
                  {styles.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-cyan-400 mb-2 font-mono">Data Stream</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-40 bg-black/50 text-white border border-cyan-500/30 rounded-lg p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                  placeholder="Initialize content sequence..."
                />
              </div>

              <button 
                onClick={handleRemix}
                disabled={loading || !content.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-bold py-3 px-6 rounded-lg transition-all relative overflow-hidden group font-mono"
              >
                {loading ? (
                  <div className="animate-pulse flex items-center justify-center">
                    <FiServer className="animate-spin mr-2" />
                    Synthesizing Neural Patterns...
                  </div>
                ) : (
                  <>
                    Initialize Neural Synthesis
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FiServer className="mr-2 text-cyan-400" />
              Quantum Output Matrix
            </h2>
            <div className="space-y-4">
              <AnimatePresence>
                {outputs.length === 0 ? (
                  <p className="text-cyan-400 text-center py-8 font-mono border border-cyan-500/20 rounded-lg bg-black/30">
                    [ Awaiting neural data synthesis... ]
                  </p>
                ) : (
                  outputs.map((output, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/50 border border-cyan-500/30 rounded-lg p-6 relative group hover:border-cyan-400/50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-cyan-400 font-mono">
                          Neural Pattern {index + 1} [{styles[index]?.label || 'Enhanced'}]
                        </span>
                        <button
                          onClick={() => handleCopy(output, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copied === index ? (
                            <FiCheck className="text-cyan-400" />
                          ) : (
                            <FiCopy className="text-cyan-400 hover:text-cyan-300" />
                          )}
                        </button>
                      </div>
                      <p className="text-white font-mono">
                        {output}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-pulse rounded-lg pointer-events-none" />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;