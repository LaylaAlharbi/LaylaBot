// // import React from 'react'
// // import ReactMarkdown from 'react-markdown'
// // import remarkGfm from 'remark-gfm'
// // export default function Message({ text, sender, timestamp }) {
// //   const isUser = sender === 'user'
// //   const formatTime = (date) => {
// //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //   }
// //   return (
// //     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
// //       <div
// //         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
// //           ? 'bg-blue-600 text-white rounded-br-none'
// //           : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
// //       >
// //         {isUser ? (
// //           <div className="text-sm whitespace-pre-wrap">{text}</div>
// //         ) : (
// //           <div className="prose prose-sm max-w-none text-sm">
// //             <ReactMarkdown
// //               remarkPlugins={[remarkGfm]}
// //               components={{
// //                 code({node, inline, className, children, ...props}) {
// //                   return (
// //                     <code className="bg-gray-100 p-1 rounded" {...props}>
// //                       {children}
// //                     </code>
// //                   )
// //                 },
// //                 a({node, children, ...props}) {
// //                   return (
// //                     <a className="text-blue-600 hover:underline" {...props}>
// //                       {children}
// //                     </a>
// //                   )
// //                 }
// //               }}
// //             >
// //               {text}
// //             </ReactMarkdown>
// //           </div>
// //         )}
// //         <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
// //           {formatTime(new Date(timestamp))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// import React from 'react'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import Lottie from 'lottie-react';
// import animationRopot from '../assets/animationRopot';


// export default function Message({ text, sender, timestamp }) {
//   const isUser = sender === 'user'
//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//   }

//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
//       <div
//         className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm ${
//           isUser
//             ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none border border-indigo-400/30'
//             : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none border border-white/50 dark:border-gray-600/50'
//         }`}
//       >
//         {isUser ? (
//           <div className="text-sm whitespace-pre-wrap">{text}</div>
//         ) : (
//           <div className="prose prose-sm max-w-none text-sm dark:prose-invert">
//             <ReactMarkdown
//               remarkPlugins={[remarkGfm]}
//               components={{
//                 code({node, inline, className, children, ...props}) {
//                   return (
//                     <code className={`p-1 rounded ${
//                       isUser 
//                         ? 'bg-indigo-400/30 text-white' 
//                         : 'bg-gray-100/70 dark:bg-gray-600/50'
//                     }`} {...props}>
//                       {children}
//                     </code>
//                   )
//                 },
//                 a({node, children, ...props}) {
//                   return (
//                     <a className={`${
//                       isUser 
//                         ? 'text-blue-100 hover:text-white' 
//                         : 'text-indigo-600 dark:text-indigo-400'
//                     } hover:underline`} {...props}>
//                       {children}
//                     </a>
//                   )
//                 },
//                 pre({node, children, ...props}) {
//                   return (
//                     <pre className={`p-2 rounded-lg my-2 overflow-x-auto ${
//                       isUser 
//                         ? 'bg-indigo-400/20' 
//                         : 'bg-gray-100/70 dark:bg-gray-600/30'
//                     }`} {...props}>
//                       {children}
//                     </pre>
//                   )
//                 }
//               }}
//             >
//               {text}
//             </ReactMarkdown>
//           </div>
//         )}
//         <div className={`text-xs mt-1.5 ${
//           isUser 
//             ? 'text-indigo-100/80' 
//             : 'text-gray-500 dark:text-gray-400'
//         }`}>
//           {formatTime(new Date(timestamp))}
//         </div>
//       </div>
//     </div>
//   )
// }


import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Lottie from 'lottie-react'
import animationRopot from '../../assets/Animation - Ropot.json'

export default function Message({ text, sender, timestamp }) {
  const isUser = sender === 'user'
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {/* Lottie animation for AI messages */}
      {!isUser && (
        <div className="flex-shrink-0 mr-2 self-end">
          <Lottie 
            animationData={animationRopot} 
            autoplay={true}
            loop={false}
            className="w-10 h-10" 
          />
        </div>
      )}
      
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm ${
          isUser
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none border border-indigo-400/30'
            : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none border border-white/50 dark:border-gray-600/50'
        }`}
      >
        {isUser ? (
          <div className="text-sm whitespace-pre-wrap">{text}</div>
        ) : (
          <div className="prose prose-sm max-w-none text-sm dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  return (
                    <code className={`p-1 rounded ${
                      isUser 
                        ? 'bg-indigo-400/30 text-white' 
                        : 'bg-gray-100/70 dark:bg-gray-600/50'
                    }`} {...props}>
                      {children}
                    </code>
                  )
                },
                a({node, children, ...props}) {
                  return (
                    <a className={`${
                      isUser 
                        ? 'text-blue-100 hover:text-white' 
                        : 'text-indigo-600 dark:text-indigo-400'
                    } hover:underline`} {...props}>
                      {children}
                    </a>
                  )
                },
                pre({node, children, ...props}) {
                  return (
                    <pre className={`p-2 rounded-lg my-2 overflow-x-auto ${
                      isUser 
                        ? 'bg-indigo-400/20' 
                        : 'bg-gray-100/70 dark:bg-gray-600/30'
                    }`} {...props}>
                      {children}
                    </pre>
                  )
                }
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        )}
        <div className={`text-xs mt-1.5 ${
          isUser 
            ? 'text-indigo-100/80' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {formatTime(new Date(timestamp))}
        </div>
      </div>
    </div>
  )
}