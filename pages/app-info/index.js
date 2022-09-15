import React from 'react'
import { PageScreen } from '@/Components/app'
import { Pill, Spacer } from '@/Components/utility'
import { FiHeart } from 'react-icons/fi'
import Image from 'next/image'
import { socialLinks } from '@/Data/devSocialLinks'
import { privateRoute } from '@/Routes/privateRoute'

const AppInfo = () => {
    return (
        <PageScreen title={'App Info'}>
            <div className="w-full flex flex-col text-justify p-2">
                <div className="flex flex-col flex-1 gap-5">
                    <div className="flex gap-2">
                        <h1 className="text-2xl font-bold">Payabl</h1>
                        <Pill color='primary'>
                            v1.0.0
                        </Pill>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">About</h1>
                        <p className="text-sm text-gray-500">Payabl is an Open Source, simple and easy to use expense tracker app. It is built using Next.js and Firebase.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">Privacy Policy</h1>
                        <p className="text-sm text-gray-500">
                            All the data you enter is stored securely to your account in the Firebase database.
                            <br />
                            We do not share your data with anyone.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">Terms of Service</h1>
                        <p className="text-sm text-gray-500">Payabl is a free to use app. It is not responsible for any loss of data or any other issues that may arise due to the use of this app.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">Open Source</h1>
                        <p className="text-sm text-gray-500">
                            Payabl is an open source project. You can find the source code on <a className='text-primary-600 font-medium' href="https://github.com/trehansangpriya/payabl" target="_blank" rel="noreferrer">GitHub</a>.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">Contact</h1>
                        <p className="text-sm text-gray-500">
                            If you have any questions or suggestions, feel free to contact me on <a className='text-primary-600 font-medium' href="https://twitter.com/trehansangpriya" target="_blank" rel="noreferrer">Twitter</a> or <a className='text-primary-600 font-medium' href="https://linkedin.com/in/trehan-sangpriya" target="_blank" rel="noreferrer">LinkedIn</a>.
                        </p>
                    </div>
                </div>
                <Spacer h='84px' />
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                        src='/assets/images/trehan.png'
                        alt='Trehan Sangpriya'
                        width={72}
                        height={72}
                    />
                    <h1 className="font-medium">Made with <FiHeart className='inline' /> by Trehan Sangpriya</h1>
                    <div className={[
                        'flex bg-layout-800 p-2 gap-3 rounded-lg w-fit',
                    ].join(' ')}>
                        {socialLinks.map((link, index) => (
                            <a href={link.url} key={index} target='_blank' rel='noreferrer' className='text-xl text-layout-100 hover:scale-105 transition-all' title={link.title}>
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </PageScreen>
    )
}

export default privateRoute(AppInfo)