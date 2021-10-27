import React, { useEffect, useState } from 'react';
import Speech from 'speak-tts';

interface Props {
    selectedText: string;
    start: () => void;
    stop: () => void;
    resume: () => void;
    cancel: () => void;
}


export function Topbar({
    selectedText,
    start,
    stop,
    resume,
    cancel,
}: Props) {

    const speech = new Speech();
    const lang_array = [
        'ar-SA',
        'cs-CZ',
        'da-DK',
        'de-DE',
        'el-GR',
        'en',
        'en-AU',
        'en-GB',
        'en-IE',
        'en-IN',
        'en-US',
        'en-ZA',
        'es-AR',
        'es-ES',
        'es-MX',
        'es-US',
        'fi-FI',
        'fr-CA',
        'fr-FR',
        'he-IL',
        'hi-IN',
        'hu-HU',
        'id-ID',
        'it-IT',
        'ja-JP',
        'ko-KR',
        'nb-NO',
        'nl-BE',
        'nl-NL',
        'pl-PL',
        'pt-BR',
        'pt-PT',
        'ro-RO',
        'ru-RU',
        'sk-SK',
        'sv-SE',
        'th-TH',
        'tr-TR',
        'zh-CN',
        'zh-HK',
        'zh-TW',
    ]

    const [language, setLanguage] = useState('en-US');
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(0);
    const [rate, setRate] = useState(0);
    const [active, setActive] = useState('');

    useEffect(() => {
        if (speech.hasBrowserSupport()) {
            // console.log("speech synthesis supported");
        }
        speech.init({
        }).then((data: any) => {
            // console.log("Speechis ready, voices are available", data);
        }).catch((e: any) => {
            console.error("An error occured while initializing : ", e);
        });
        speech.setRate(rate);
        speech.setVolume(volume);
        speech.setPitch(pitch);
    })

    const selectLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
        speech.setLanguage(event.target.value);
        console.log(language);
    }

    const selectVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.target.value));
    }

    const selectRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRate(Number(event.target.value));
        speech.setRate(Number(event.target.value));
    }

    const selectPitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPitch(Number(event.target.value));
        speech.setPitch(Number(event.target.value));
    }


    start = () => {
        console.log('start');
        console.log(selectedText);
        setActive('start');
        speech.setLanguage(language);
        speech.setRate(rate);
        speech.setVolume(volume);
        speech.setPitch(pitch);
        if (selectedText) {
            speech.speak({
                text: selectedText
            }).then(() => {
                console.log("Success")
            }).catch((e: any) => {
                console.error("An jerror occurred :", e)
            })
        }
    }

    stop = () => {
        console.log('stop');
        setActive('stop');
        speech.pause();
    }

    resume = () => {
        console.log('resume');
        setActive('resume');
        speech.resume();
    }

    cancel = () => {
        console.log('cancel');
        setActive('cancel');
        speech.cancel();
    }

    return (
        <div className='topbar'>
            <div className='button-group'>
                {/* <button onClick={start} className={`${active === 'start' ? 'btn-active' : ''} btn btn-start`}>Start</button> */}
                <button onClick={stop} className={`${active === 'stop' ? 'btn-active' : ''} btn btn-stop`}>Stop</button>
                <button onClick={resume} className={`${active === 'resume' ? 'btn-active' : ''} btn btn-resume`}>Resume</button>
                <button onClick={cancel} className={`${active === 'cancel' ? 'btn-active' : ''} btn btn-cancel`}>Cancel</button>
            </div>

            <div className="select-group">
                <div>
                    <span>Select Language </span>
                    <select name="language" value={language} onChange={selectLang}>
                        {
                            lang_array.map((lang, i) => {
                                return (
                                    <option key={i}>{lang}</option>
                                )
                            })
                        }
                    </select>
                </div>
                {/* <span>Volum(0,1) :</span>
                <input type="number" min='0' max='1' value={volume} onChange={selectVolume} /> */}
                <div>
                    <span>Select Rate </span>
                    <input type='number' value={rate} min='0' max='10' onChange={selectRate} />
                </div>

                <div>
                    <span>Select Pitch </span>
                    <input type='number' value={pitch} min='0' max='2' onChange={selectPitch} />
                </div>
            </div>

            <div className='text-group'>
                <span>Selected Texts </span>
                <input type='text' placeholder='please select the texts' value={selectedText} disabled />
            </div>
        </div>
    )
}