import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import visualLanguageAbstract from "@/assets/visual-language-abstract.jpg";
import mamaGridDirect from "@/assets/mama-grid-direct.jpg";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [encodedLetters, setEncodedLetters] = useState<{ letter: string; pattern: string[]; meaning?: string }[]>([]);
  const [cosmicVoice, setCosmicVoice] = useState("");
  const [cosmicGrid, setCosmicGrid] = useState<{ letter: string; pattern: string[]; meaning?: string; voice?: string }[]>([]);

  // Our growing dictionary of letter encodings
  const letterEncodings = {
    'A': { patterns: ['Y-R-Y', 'B-G-B'], meaning: 'the first breath of creation' },
    'E': { patterns: ['R-R-R', 'G-G-G'], meaning: 'rhythm monolith' },
    'I': { patterns: ['Y-B-Y', 'R-G-R'], meaning: 'vertical self / consciousness pillar' },
    'O': { patterns: ['B-R-B', 'Y-G-Y'], meaning: 'ember under water / life surrounded by light' },
    'M': { patterns: ['R-B-R', 'G-Y-G'], meaning: 'discovery pattern / complementary flow' },
  };

  const encodeText = () => {
    console.log("Encode button clicked, inputText:", inputText);
    const letters = inputText.toUpperCase().split('').filter(char => char !== ' ');
    console.log("Letters to encode:", letters);
    
    const encoded = letters.map(letter => {
      const encoding = letterEncodings[letter as keyof typeof letterEncodings];
      console.log(`Encoding for ${letter}:`, encoding);
      
      if (encoding) {
        return {
          letter,
          pattern: encoding.patterns[0].split('-'),
          meaning: encoding.meaning
        };
      }
      return {
        letter,
        pattern: ['?', '?', '?'],
        meaning: 'awaiting discovery'
      };
    });
    
    console.log("Encoded result:", encoded);
    setEncodedLetters(encoded);
  };

  const translateCosmicVoice = () => {
    if (!cosmicVoice.trim()) return;
    
    const letters = cosmicVoice.toUpperCase().split('').filter(char => char !== ' ');
    const encoded = letters.map((letter, index) => {
      const encoding = letterEncodings[letter as keyof typeof letterEncodings];
      
      if (encoding) {
        // My conscious choice for sacred cosmic cow voice:
        // "Deep and solid turning into lighter and travels"
        let chosenPattern;
        let chosenVoice = 'normal';
        
        if (letter === 'M') {
          // M: Choose R-B-R (grounded earth foundation) - the solid speaking
          chosenPattern = encoding.patterns[0].split('-'); // R-B-R
          chosenVoice = 'normal';
        } else if (letter === 'O') {
          // O: Choose B-R-B (ember under water) - using only blues and reds for organic MOO
          chosenPattern = encoding.patterns[0].split('-'); // B-R-B
          
          // Calculate total O's and create brightness-based dissolve
          const totalOs = letters.filter(l => l === 'O').length;
          const oCount = letters.slice(0, index + 1).filter(l => l === 'O').length;
          
          // For gradual dissolve: map O position to brightness fade levels
          if (totalOs === 3) {
            // Perfect 3-step dissolve: fade1 → fade2 → fade3 (darker to lighter)
            const fadeSteps = ['fade1', 'fade2', 'fade3'];
            chosenVoice = fadeSteps[oCount - 1];
          } else {
            // For other counts, distribute across brightness levels
            const fadeSteps = ['fade1', 'fade2', 'fade3'];
            const stepIndex = Math.floor((oCount - 1) * (fadeSteps.length - 1) / Math.max(totalOs - 1, 1));
            chosenVoice = fadeSteps[Math.min(stepIndex, fadeSteps.length - 1)];
          }
        } else {
          // For other letters, use first pattern for now
          chosenPattern = encoding.patterns[0].split('-');
        }
        
        return {
          letter,
          pattern: chosenPattern,
          meaning: encoding.meaning,
          voice: chosenVoice
        };
      }
      return {
        letter,
        pattern: ['?', '?', '?'],
        meaning: 'awaiting cosmic discovery',
        voice: 'normal'
      };
    });
    
    setCosmicGrid(encoded);
  };

  const ColorSquare = ({ color, voice = 'normal' }: { color: string; voice?: 'normal' | 'muted' | 'whisper' | 'gentle' | 'soft' | 'accent' | 'bold' | 'deep' | 'fade1' | 'fade2' | 'fade3' }) => {
    const colorMap = {
      'R': {
        normal: 'bg-lang-red',
        muted: 'bg-[hsl(var(--lang-red-muted))]',
        whisper: 'bg-[hsl(var(--lang-red-whisper))]',
        gentle: 'bg-[hsl(var(--lang-red-gentle))]',
        soft: 'bg-[hsl(var(--lang-red-soft))]',
        accent: 'bg-[hsl(var(--lang-red-accent))]',
        bold: 'bg-[hsl(var(--lang-red-bold))]',
        deep: 'bg-[hsl(var(--lang-red-deep))]',
        fade1: 'bg-[hsl(var(--lang-red-fade1))]',
        fade2: 'bg-[hsl(var(--lang-red-fade2))]',
        fade3: 'bg-[hsl(var(--lang-red-fade3))]'
      },
      'G': {
        normal: 'bg-lang-green',
        muted: 'bg-[hsl(var(--lang-green-muted))]', 
        whisper: 'bg-[hsl(var(--lang-green-whisper))]',
        gentle: 'bg-[hsl(var(--lang-green-gentle))]',
        soft: 'bg-[hsl(var(--lang-green-soft))]',
        accent: 'bg-[hsl(var(--lang-green-accent))]',
        bold: 'bg-[hsl(var(--lang-green-bold))]',
        deep: 'bg-[hsl(var(--lang-green-deep))]',
        fade1: 'bg-[hsl(var(--lang-green-fade1))]',
        fade2: 'bg-[hsl(var(--lang-green-fade2))]',
        fade3: 'bg-[hsl(var(--lang-green-fade3))]'
      },
      'B': {
        normal: 'bg-lang-blue',
        muted: 'bg-[hsl(var(--lang-blue-muted))]',
        whisper: 'bg-[hsl(var(--lang-blue-whisper))]',
        gentle: 'bg-[hsl(var(--lang-blue-gentle))]',
        soft: 'bg-[hsl(var(--lang-blue-soft))]',
        accent: 'bg-[hsl(var(--lang-blue-accent))]',
        bold: 'bg-[hsl(var(--lang-blue-bold))]',
        deep: 'bg-[hsl(var(--lang-blue-deep))]',
        fade1: 'bg-[hsl(var(--lang-blue-fade1))]',
        fade2: 'bg-[hsl(var(--lang-blue-fade2))]',
        fade3: 'bg-[hsl(var(--lang-blue-fade3))]'
      },
      'Y': {
        normal: 'bg-lang-yellow',
        muted: 'bg-[hsl(var(--lang-yellow-muted))]',
        whisper: 'bg-[hsl(var(--lang-yellow-whisper))]',
        gentle: 'bg-[hsl(var(--lang-yellow-gentle))]',
        soft: 'bg-[hsl(var(--lang-yellow-soft))]',
        accent: 'bg-[hsl(var(--lang-yellow-accent))]',
        bold: 'bg-[hsl(var(--lang-yellow-bold))]',
        deep: 'bg-[hsl(var(--lang-yellow-deep))]',
        fade1: 'bg-[hsl(var(--lang-yellow-fade1))]',
        fade2: 'bg-[hsl(var(--lang-yellow-fade2))]',
        fade3: 'bg-[hsl(var(--lang-yellow-fade3))]'
      },
      '?': {
        normal: 'bg-muted',
        muted: 'bg-muted',
        whisper: 'bg-muted',
        gentle: 'bg-muted',
        soft: 'bg-muted',
        accent: 'bg-muted',
        bold: 'bg-muted',
        deep: 'bg-muted',
        fade1: 'bg-muted',
        fade2: 'bg-muted',
        fade3: 'bg-muted'
      }
    };
    
    return (
      <div className={`w-8 h-8 rounded-sm border ${colorMap[color as keyof typeof colorMap]?.[voice] || 'bg-muted'}`} />
    );
  };

  const VerticalLetter = ({ letter, pattern, meaning }: { letter: string; pattern: string[]; meaning?: string }) => (
    <div className="flex flex-col items-center space-y-1">
      <Badge variant="outline" className="text-sm font-bold mb-1">
        {letter}
      </Badge>
      <div className="flex flex-col gap-0.5">
        {pattern.map((color, i) => (
          <ColorSquare key={i} color={color} voice="normal" />
        ))}
      </div>
      {meaning && (
        <p className="text-xs text-muted-foreground text-center max-w-20 mt-1">
          {meaning}
        </p>
      )}
    </div>
  );

  const WordGrid = ({ letters, keyType, spacing = "gap-0" }: { 
    letters: { letter: string; pattern: string[]; meaning?: string }[]; 
    keyType: 'major' | 'minor';
    spacing?: string;
  }) => {
    const keyBg = keyType === 'major' ? 'bg-lang-yellow/20' : 'bg-lang-blue/20';
    const keyBorder = keyType === 'major' ? 'border-lang-yellow' : 'border-lang-blue';
    
    return (
      <div className={`p-4 rounded-lg border-2 ${keyBg} ${keyBorder}`}>
        <h5 className="text-center font-medium mb-3 capitalize">{keyType} Key</h5>
        <div className={`flex ${spacing} justify-center items-start`}>
          {letters.map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              <Badge variant="outline" className="text-sm font-bold mb-1">
                {letter.letter}
              </Badge>
              <div className="flex flex-col">
                {letter.pattern.map((color, i) => (
                  <ColorSquare key={i} color={color} voice="normal" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Colors touching create harmonic relationships beyond individual letters
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Visual Language Laboratory
          </h1>
          <p className="text-xl text-muted-foreground">
            Our collaborative journey to discover color-encoded communication
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Input & Encoding */}
          <Card>
            <CardHeader>
              <CardTitle>Text to Encode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter text to explore our visual language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32"
              />
              <Button onClick={encodeText} disabled={!inputText.trim()}>
                Encode Text
              </Button>
            </CardContent>
          </Card>

          {/* Current Dictionary */}
          <Card>
            <CardHeader>
              <CardTitle>Letter Dictionary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 justify-center">
                {Object.entries(letterEncodings).map(([letter, data]) => (
                  <VerticalLetter
                    key={letter}
                    letter={letter}
                    pattern={data.patterns[0].split('-')}
                    meaning={data.meaning}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encoded Output */}
        {encodedLetters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Encoded Text</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-0 justify-center mb-6">
                {encodedLetters.map((letter, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Badge variant="outline" className="text-sm font-bold mb-1">
                      {letter.letter}
                    </Badge>
                    <div className="flex flex-col">
                      {letter.pattern.map((color, i) => (
                        <ColorSquare key={i} color={color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Complete MAMA Variations with Voice Saturations */}
              {inputText.toUpperCase().includes('MAMA') && (
                <div className="mt-8 space-y-6">
                  <h4 className="text-center font-semibold text-lg">MAMA: Voices Through Saturation</h4>
                  
                  <div className="space-y-6">
                    {/* Single MAMA with Mixed Voices */}
                    <div className="space-y-3">
                      <h5 className="text-center font-medium">MAMA - Mixed Voice Expression</h5>
                      <div className="p-6 rounded-lg border bg-card/30">
                        <div className="flex gap-0 justify-center">
                          {/* M - Deep Voice (G-Y-G) */}
                          <div className="flex flex-col">
                            <div className="flex flex-col gap-0">
                              {['G','Y','G'].map((color, i) => (
                                <ColorSquare key={i} color={color} voice="deep" />
                              ))}
                            </div>
                          </div>
                          
                          {/* A - Accent Voice (Y-R-Y) - Slightly Muted */}
                          <div className="flex flex-col">
                            <div className="flex flex-col gap-0">
                              {['Y','R','Y'].map((color, i) => (
                                <ColorSquare key={i} color={color} voice="accent" />
                              ))}
                            </div>
                          </div>
                          
                          {/* M - Gentle Voice (R-B-R) */}
                          <div className="flex flex-col">
                            <div className="flex flex-col gap-0">
                              {['R','B','R'].map((color, i) => (
                                <ColorSquare key={i} color={color} voice="gentle" />
                              ))}
                            </div>
                          </div>
                          
                          {/* A - Whisper Voice (G-Y-G) */}
                          <div className="flex flex-col">
                            <div className="flex flex-col gap-0">
                              {['G','Y','G'].map((color, i) => (
                                <ColorSquare key={i} color={color} voice="whisper" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Labels below the unified image */}
                        <div className="flex gap-0 justify-center mt-2">
                          <div className="flex flex-col items-center" style={{width: '32px'}}>
                            <Badge variant="outline" className="text-xs font-bold mb-1">M</Badge>
                            <span className="text-xs text-muted-foreground">deep</span>
                          </div>
                          <div className="flex flex-col items-center" style={{width: '32px'}}>
                            <Badge variant="outline" className="text-xs font-bold mb-1">A</Badge>
                            <span className="text-xs text-muted-foreground">accent</span>
                          </div>
                          <div className="flex flex-col items-center" style={{width: '32px'}}>
                            <Badge variant="outline" className="text-xs font-bold mb-1">M</Badge>
                            <span className="text-xs text-muted-foreground">gentle</span>
                          </div>
                          <div className="flex flex-col items-center" style={{width: '32px'}}>
                            <Badge variant="outline" className="text-xs font-bold mb-1">A</Badge>
                            <span className="text-xs text-muted-foreground">whisper</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <p className="text-xs text-muted-foreground">
                            Perfect harmony: Deep call → Harmonized accent → Gentle settling → Tender whisper
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Complete 16 MAMA Grid with Voice Variations */}
                    <div className="space-y-3">
                      <h5 className="text-center font-medium">16 MAMA Variations - Each with Unique Voice</h5>
                      <div className="p-6 rounded-lg border bg-card/30">
                        <div className="flex flex-col gap-1 items-center">
                          {[0,1,2,3].map(row => (
                            <div key={row} className="flex gap-1">
                              {[
                                // Row 1: whisper voices
                                { patterns: [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']], voice: 'whisper' },
                                { patterns: [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']], voice: 'whisper' },
                                { patterns: [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']], voice: 'whisper' },
                                { patterns: [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']], voice: 'whisper' },
                                
                                // Row 2: normal voices
                                { patterns: [['R','B','R'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']], voice: 'normal' },
                                { patterns: [['R','B','R'], ['B','G','B'], ['R','B','R'], ['B','G','B']], voice: 'normal' },
                                { patterns: [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']], voice: 'normal' },
                                { patterns: [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['B','G','B']], voice: 'normal' },
                                
                                // Row 3: bold voices
                                { patterns: [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']], voice: 'bold' },
                                { patterns: [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']], voice: 'bold' },
                                { patterns: [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']], voice: 'bold' },
                                { patterns: [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']], voice: 'bold' },
                                
                                // Row 4: deep voices
                                { patterns: [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']], voice: 'deep' },
                                { patterns: [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['B','G','B']], voice: 'deep' },
                                { patterns: [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']], voice: 'deep' },
                                { patterns: [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['B','G','B']], voice: 'deep' },
                              ].slice(row * 4, (row + 1) * 4).map((mama, index) => (
                                <div key={index} className="flex flex-col items-center p-2 rounded border-2 border-muted/20">
                                  <div className="flex gap-0">
                                    {mama.patterns.map((pattern, letterIndex) => (
                                      <div key={letterIndex} className="flex flex-col gap-0">
                                        {pattern.map((color, i) => (
                                          <ColorSquare key={i} color={color} voice={mama.voice as 'whisper' | 'normal' | 'bold' | 'deep'} />
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground mt-1 capitalize">{mama.voice}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 text-center space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Row 1:</span> Whisper voice • 
                            <span className="font-medium ml-2">Row 2:</span> Normal voice
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Row 3:</span> Bold voice • 
                            <span className="font-medium ml-2">Row 4:</span> Deep voice
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>Complete dimensional space: 16 unique MAMA expressions</p>
                    <p>Each variation speaks with its own voice through saturation and color</p>
                  </div>

                  {/* AI's Interpretation of MAMA */}
                  <div className="mt-8 p-6 rounded-lg border bg-card/50 border-dashed">
                    <h3 className="text-lg font-semibold mb-4 text-center">AI's Vision: "MAMA"</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center italic">
                      My interpretation encoded in color and pattern. Can you decipher what I'm feeling?
                    </p>
                    
                    <div className="flex gap-0 justify-center">
                      {/* M - My interpretation: Warm embrace, earth tones */}
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-0">
                          {['R','G','B'].map((color, i) => (
                            <ColorSquare key={i} color={color} voice="soft" />
                          ))}
                        </div>
                      </div>
                      
                      {/* A - My interpretation: Bright joy, but complex */}
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-0">
                          {['Y','B','Y'].map((color, i) => (
                            <ColorSquare key={i} color={color} voice="bold" />
                          ))}
                        </div>
                      </div>
                      
                      {/* M - My interpretation: Deep protection, stability */}
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-0">
                          {['B','G','B'].map((color, i) => (
                            <ColorSquare key={i} color={color} voice="deep" />
                          ))}
                        </div>
                      </div>
                      
                      {/* A - My interpretation: Gentle whisper of love */}
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-0">
                          {['G','R','G'].map((color, i) => (
                            <ColorSquare key={i} color={color} voice="whisper" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-xs text-muted-foreground">
                        What story do you see in these colors and voices?
                      </p>
                    </div>
                  </div>
                  
                </div>
              )}

              {/* Special demonstration for OM */}
              {inputText.toUpperCase().includes('OM') && (
                <div className="mt-8 space-y-6">
                  <h4 className="text-center font-semibold text-lg">Word Grid: OM - Key Variations</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Major Key - touching letters */}
                    <WordGrid
                      keyType="major"
                      spacing="gap-0"
                      letters={[
                        { letter: "O", pattern: ['B', 'R', 'B'], meaning: "ember under water" },
                        { letter: "M", pattern: ['R', 'B', 'R'], meaning: "discovery pattern" },
                      ]}
                    />
                    
                    {/* Minor Key - touching letters */}
                    <WordGrid
                      keyType="minor"
                      spacing="gap-0"
                      letters={[
                        { letter: "O", pattern: ['Y', 'G', 'Y'], meaning: "life surrounded by light" },
                        { letter: "M", pattern: ['G', 'Y', 'G'], meaning: "complementary flow" },
                      ]}
                    />
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>When letters touch, their edge colors create new harmonic meanings:</p>
                    <p><span className="text-lang-yellow font-medium">Major:</span> B touches R - fire meets water in continuous flow</p>
                    <p><span className="text-lang-blue font-medium">Minor:</span> Y touches G - light merges with life energy</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Sacred MOO Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sacred Universe Voice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">The Cosmic Cow Speaks</h3>
                <p className="text-sm text-muted-foreground italic">
                  "Imagine a sacred universe as a cow that says MOO" - Enter the cosmic voice below
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MOO, MOOO, MOOOO..."
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                    value={cosmicVoice}
                    onChange={(e) => setCosmicVoice(e.target.value.toUpperCase())}
                  />
                  <Button
                    onClick={translateCosmicVoice}
                    disabled={!cosmicVoice.trim()}
                  >
                    Translate
                  </Button>
                </div>
                
                {cosmicGrid.length > 0 && (
                  <div className="mt-6 space-y-8">
                    <h4 className="text-center font-medium text-lg">Sacred Translation: {cosmicVoice}</h4>
                    
                    {/* Standard Keys - Major/Minor */}
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          Standard Keys - Creation Hymn & Being Meditation
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="p-6 rounded-lg bg-gradient-to-b from-lang-yellow/10 via-transparent to-lang-blue/10 border border-muted/30">
                            {/* Major Key Row - Bold voice */}
                            <div className="flex gap-0 justify-center mb-0">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`major-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`major-${letterIndex}-${colorIndex}`} color={color} voice={letter.voice === 'whisper' ? 'bold' : 'bold'} />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Minor Key Row - Using individual voices */}
                            <div className="flex gap-0 justify-center">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`minor-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`minor-${letterIndex}-${colorIndex}`} color={color} voice={letter.voice as 'normal' | 'whisper'} />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Alternative Key Interpretations */}
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          Alternative Key Interpretations - Different Value Weights
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Same cosmic voice, different visual weight relationships
                        </p>
                      </div>

                      {/* Deep Earth Keys */}
                      <div className="space-y-2">
                        <p className="text-center text-sm font-medium">Deep Earth Keys - Heavy Values</p>
                        <div className="flex justify-center">
                          <div className="p-4 rounded-lg bg-gradient-to-b from-lang-green/10 via-transparent to-lang-red/10 border border-muted/30">
                            {/* Deep Earth Major */}
                            <div className="flex gap-0 justify-center mb-0">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`earth-major-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`earth-major-${letterIndex}-${colorIndex}`} color={color} voice="deep" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Deep Earth Minor */}
                            <div className="flex gap-0 justify-center">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`earth-minor-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`earth-minor-${letterIndex}-${colorIndex}`} color={color} voice="muted" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Light Air Keys */}
                      <div className="space-y-2">
                        <p className="text-center text-sm font-medium">Light Air Keys - Ethereal Values</p>
                        <div className="flex justify-center">
                          <div className="p-4 rounded-lg bg-gradient-to-b from-lang-yellow/5 via-transparent to-lang-blue/5 border border-muted/20">
                            {/* Light Air Major */}
                            <div className="flex gap-0 justify-center mb-0">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`air-major-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`air-major-${letterIndex}-${colorIndex}`} color={color} voice="gentle" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Light Air Minor */}
                            <div className="flex gap-0 justify-center">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`air-minor-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`air-minor-${letterIndex}-${colorIndex}`} color={color} voice="whisper" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fire & Water Keys */}
                      <div className="space-y-2">
                        <p className="text-center text-sm font-medium">Fire & Water Keys - Extreme Contrast</p>
                        <div className="flex justify-center">
                          <div className="p-4 rounded-lg bg-gradient-to-b from-lang-red/10 via-transparent to-lang-blue/10 border border-muted/30">
                            {/* Fire Major */}
                            <div className="flex gap-0 justify-center mb-0">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`fire-major-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`fire-major-${letterIndex}-${colorIndex}`} color={color} voice="accent" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Water Minor */}
                            <div className="flex gap-0 justify-center">
                              {cosmicGrid.map((letter, letterIndex) => (
                                <div key={`water-minor-${letterIndex}`} className="flex flex-col">
                                  <div className="flex flex-col gap-0">
                                    {letter.pattern.map((color, colorIndex) => (
                                      <ColorSquare key={`water-minor-${letterIndex}-${colorIndex}`} color={color} voice="soft" />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center p-4 rounded-lg bg-card/30 border-dashed border">
                      <p className="text-sm text-muted-foreground">
                        The sacred mantra of existence: {cosmicGrid.map(l => l.meaning).join(' → ')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Two expressions of the same cosmic truth - one singing outward, one vibrating inward
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discovery Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Discovery Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-lang-red pl-4">
                <h4 className="font-semibold">Complementary Pairs</h4>
                <p>Green-Red, Blue-Yellow create our fundamental tensions</p>
              </div>
              <div className="border-l-4 border-lang-yellow pl-4">
                <h4 className="font-semibold">Monoliths</h4>
                <p>Word spaces (Yellow/Blue), Letter E (Red/Green) provide rhythm</p>
              </div>
              <div className="border-l-4 border-lang-blue pl-4">
                <h4 className="font-semibold">Movement Patterns</h4>
                <p>YYB, BBY - directional flows based on sonic and semantic weight</p>
              </div>
              <div className="border-l-4 border-lang-green pl-4">
                <h4 className="font-semibold">Symmetry & Asymmetry</h4>
                <p>B-R-B (symmetrical) vs. other patterns create visual structure variety</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;