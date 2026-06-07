import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="mb-3 text-lg font-semibold text-[#a89bff]">{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-gray-300">{children}</div>
  </div>
);

const Sub = ({ title }) => (
  <h3 className="mt-5 mb-2 text-sm font-semibold text-white">{title}</h3>
);

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Privacy Policy | XMO Messenger";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.title = "XMO Messenger | Decentralized Private Messaging App";
    };
  }, []);


  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0d0d1a] overflow-hidden" style={{ animation: "fadeIn 0.25s ease" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .policy-scroll::-webkit-scrollbar { width: 6px; }
        .policy-scroll::-webkit-scrollbar-track { background: #1a1a2e; }
        .policy-scroll::-webkit-scrollbar-thumb { background: #5542ff; border-radius: 3px; }
        code { background: #1e1e3f; padding: 2px 8px; border-radius: 4px; font-family: monospace; color: #a89bff; font-size: 0.85em; }
      `}</style>

      <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between bg-[#0d0d1a]/95 px-8 py-5 backdrop-blur-sm border-b border-white/5">
          <div>
            <h1 className="text-xl font-bold text-white">XMO Privacy Policy</h1>
            <p className="text-xs text-gray-400 mt-0.5">Effective date: June 5, 2026</p>
          </div>
          <button onClick={() => navigate(-1)} id="close-privacy-policy" aria-label="Close Privacy Policy"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all duration-200 hover:bg-[#5542ff]/30 hover:text-white">
            <IoClose size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="policy-scroll flex-1 overflow-y-auto px-8 md:px-16 lg:px-32 xl:px-48 py-8 text-sm text-gray-300 leading-relaxed space-y-4">

          <p>This Privacy Policy explains how XMO collects, uses, stores, shares, and protects information when you use the XMO mobile app, web app, Matrix homeserver, authentication services, calling features, story features, wallet login, and donation features.</p>
          <p>XMO is a Matrix-based messaging application. Some parts of the service are provided by XMO-operated infrastructure, such as the XMO Matrix homeserver and OTP backend. Some parts rely on third-party services, such as Matrix protocol infrastructure, email delivery, wallet providers, WalletConnect/Reown, Thirdweb, Firebase initialization services, and blockchain networks.</p>
          <p className="text-[#a89bff] font-medium">If you do not agree with this Privacy Policy, do not use XMO.</p>
          <p>This policy is written to describe how XMO works from a privacy perspective. It does not replace any terms of service, community rules, blockchain wallet rules, Matrix homeserver rules, or third-party provider policies that may also apply to your use of the app.</p>

          <Section title="Summary">
            <p>XMO is designed as a private messaging and calling app built on Matrix, with a long-term direction toward end-to-end encrypted communication, decentralized ownership, and stronger user control over data. Your account, rooms, messages, media, groups, channels, and stories are processed through Matrix-compatible infrastructure. When you send something to another person or room, that content has to be delivered to the relevant recipients and may be stored on the homeserver so those recipients can access it.</p>
            <p>XMO also stores some information locally on your device to make the app work smoothly. This includes login/session state, settings, cached media previews, downloaded files, local call history, and temporary upload state. Local information helps the app show chats faster, remember your choices, and support features such as storage usage, shared media, pending uploads, and call history.</p>
            <p>Some features use separate services. Email verification uses an OTP backend. Wallet login uses wallet connection and message signing. Donations use Thirdweb checkout and public blockchain networks. These services process the information needed for their specific feature.</p>
            <p>Our future privacy direction is to make XMO more secure by reducing unnecessary data collection, keeping sensitive credentials out of the mobile app, improving encrypted messaging support, strengthening account and session protection, and using decentralized or federated architecture where it gives users more control and resilience. We will continue to describe important privacy limits clearly, because even secure systems may still process metadata, local cache, recipient copies, server routing information, or blockchain transaction records.</p>
          </Section>

          <Section title="Who This Policy Applies To">
            <p>This policy applies to people who install, access, register for, log in to, or otherwise use XMO. It also applies when you interact with an XMO user, group, channel, story, call, invite link, shared media item, wallet login flow, or donation checkout flow.</p>
            <p>If you use XMO through a Matrix account hosted on a different homeserver, that homeserver may have its own privacy policy. If federation is enabled, your information may be processed by both XMO-operated services and other Matrix servers involved in the rooms you join.</p>
          </Section>

          <Section title="XMO Architecture From a Privacy Perspective">
            <p>XMO has several major privacy-relevant parts. The Flutter app runs on your device and provides the user interface for chats, calls, media, stories, settings, wallet login, and donations. The Matrix homeserver stores and synchronizes account data, rooms, messages, media, profiles, group/channel state, read receipts, and other Matrix events. The OTP backend sends and verifies email codes during registration or verification flows. Wallet login uses wallet connection infrastructure and a wallet signature to prove wallet ownership. Donations use the XMO donation backend and Thirdweb to create a checkout link.</p>
            <p>This means not every piece of data is handled in the same place. Chat messages and media are Matrix data. OTP codes are temporary backend data. Downloaded files and cache are local device data. Wallet addresses and blockchain transactions are wallet/blockchain data. Understanding this separation is important because deleting or changing one type of data may not automatically delete or change all other related copies.</p>
            <p>XMO's architecture is intended to avoid a fully centralized model where one app server controls every user interaction. Matrix allows homeservers to interoperate, which can support a more decentralized communication model when federation is enabled. In that model, users may communicate across different homeservers instead of depending only on one central service. Decentralization can improve portability and resilience, but it also means that data may be processed by more than one server, and each independent server may apply its own retention, moderation, and security practices.</p>
          </Section>

          <Section title="1. Information We Collect">
            <Sub title="1.1 Account Information" />
            <p>When you create or use an XMO account, we may collect your username and Matrix user ID, display name and profile photo or avatar, email address (if you register with email verification), phone number (if provided), wallet address and signed authentication message (if you use wallet login), and profile settings, privacy settings, account visibility preferences, and related account configuration.</p>
            <p>Your account information may be visible to other users depending on how you use the app and how your privacy settings are configured. For example, your display name and profile photo may appear in direct chats, groups, channels, stories, call screens, member lists, search results, and invite-related screens.</p>

            <Sub title="1.2 Messages, Rooms, Groups, Channels, and Stories" />
            <p>XMO processes the content and metadata required to provide messaging features. This includes direct messages, group messages, channel posts, saved messages, replies, reactions, edits, pinned messages, deleted or redacted messages, and forwarded messages. When you send or receive media, XMO processes the related photos, videos, audio files, voice messages, documents, APKs, PDFs, links, thumbnails, captions, filenames, file sizes, MIME types, and upload or download metadata.</p>
            <p>For stories, XMO processes story text, story media, captions, timestamps, selected privacy audience, view counts, and story viewer information. For groups and channels, XMO processes names, descriptions, avatars, members, subscribers, admins, roles, permissions, invite links, pinned messages, and moderation-related actions.</p>
            <p>Message and media metadata can be privacy-relevant even when it is not the message body itself. For example, timestamps can show when you were active, file names can reveal information about a document, read receipts can show when a message was read, and group membership state can show which users are part of a room.</p>
            <p>Links sent in chats may be detected so the app can make them clickable and show them in shared media link tabs. Opening a link may send information to the destination website or app, such as your IP address, browser/app information, and the URL you opened. XMO does not control the privacy practices of websites you open from messages.</p>

            <Sub title="1.3 Calls" />
            <p>When you use voice or video calling, XMO processes information needed to place, receive, join, leave, reject, and end calls. This includes the caller, recipient, group, channel or room identifiers associated with the call, the call type, current call state, timestamps, duration, whether a call was missed, rejected, answered, ended, or left, and local call history used to show recent call activity.</p>
            <p>XMO also processes audio and video device state so call controls work correctly. XMO does not intentionally record your voice or video calls. Calls may still involve device permissions, WebRTC routing, and server-side signaling metadata needed to operate the call.</p>

            <Sub title="1.4 Device, App, and Usage Information" />
            <p>XMO may process technical information about your device and app environment, such as device type, operating system, app version, platform information, IP address, and network request metadata when you connect to XMO services. The app also processes local settings and app state, including notification preferences, media auto-download preferences, privacy preferences, story visibility settings, blocked users, local cache data, downloaded media records, shared media indexes, and storage usage information.</p>

            <Sub title="1.5 Wallet and Donation Information" />
            <p>If you use wallet login or crypto donations, XMO processes your wallet address and the wallet signature used to authenticate your account. The signature is used to prove control of the wallet address; it does not give XMO access to your private key.</p>
            <p>If you donate through the crypto donation feature, XMO processes the donation amount you enter and the checkout link information returned by Thirdweb. The resulting blockchain transaction information may be public on the relevant blockchain, including wallet addresses, transaction identifiers, token information, network information, and transaction amounts.</p>
            <p className="text-[#a89bff] font-medium">XMO does not ask for or store your wallet private key or seed phrase. Never share your wallet private key or seed phrase with anyone.</p>

            <Sub title="1.6 Information From Permissions" />
            <p>XMO may request camera access, microphone access, file and gallery access, audio-setting access, and internet and network access. Permission requests are controlled by your device operating system. You can usually revoke permissions in your device settings, but some XMO features may stop working if the required permission is disabled.</p>

            <Sub title="1.7 Information Other Users Provide About You" />
            <p>Other users may provide information about you when they interact with XMO — sending you messages, adding you to groups, inviting you to channels, mentioning you, forwarding your messages, reacting to your content, viewing your stories, or calling you. XMO cannot control what other users choose to share, but we may respond to abuse reports or lawful requests where required.</p>
          </Section>

          <Section title="2. How We Use Information">
            <p>We use information to create, verify, authenticate, and manage XMO accounts, provide core messaging features (direct chats, groups, channels, stories, calls, search, shared media, file handling, notifications), process media uploads and downloads, apply privacy and permission settings, improve reliability, debug errors, prevent spam or abuse, maintain service security, comply with legal obligations, and enforce our rights.</p>

            <Sub title="2.1 Legal Bases Where Applicable" />
            <p>XMO may process information because it is necessary to provide the app and services you requested, with your consent (such as camera, microphone, or wallet permissions), based on legitimate interests (security, abuse prevention, debugging), or when required to comply with legal obligations.</p>
            <p>Where consent is required, you may withdraw consent through app settings, device settings, or by stopping use of the relevant feature. Withdrawing consent may prevent certain features from working.</p>
          </Section>

          <Section title="3. How Messages and Media Are Stored">
            <p>XMO uses the Matrix protocol. Messages, media, room state, profile information, group/channel state, stories, and related metadata may be stored on the XMO-operated Matrix homeserver. XMO also stores some data locally on your device — login/session data, app settings, privacy settings, cached media previews, downloaded files, local call history, and temporary UI state.</p>
            <p>Deleting local cache or downloaded files removes them from your device storage, but it does not necessarily delete copies already stored on the Matrix homeserver, recipient devices, other federated servers, blockchain networks, or third-party services.</p>

            <Sub title="3.1 Matrix Federation" />
            <p>Matrix can support federation, which means rooms may include users from different homeservers. If federation is active and a room includes users from another homeserver, room events may be shared with that homeserver so its users can participate. Those servers may store and process room data according to their own policies. XMO cannot control independent Matrix servers that are not operated by XMO.</p>

            <Sub title="3.2 End-to-End Encryption" />
            <p>XMO is being built with an end-to-end encrypted future in mind. Where Matrix end-to-end encryption is enabled and correctly configured, message content may be protected from server-side access. However, this policy does not promise that every XMO message, media item, call, story, group, or channel is end-to-end encrypted today. Even where encryption is available, metadata such as room membership, timestamps, server routing information, file sizes, device information, and some state events may still be processed.</p>

            <Sub title="3.3 Local Downloads and Cache" />
            <p>When you download files or media, those items may be stored in app-specific folders or device-accessible storage. Downloaded files may remain on your device after you close XMO. Cached previews may also remain until you clear cache, uninstall the app, or the operating system removes cached data. If you share, open, or export downloaded files into another app, that other app may process the file under its own policy.</p>
          </Section>

          <Section title="4. Message Deletion and Redaction">
            <p>When you delete or redact a message, XMO requests a Matrix redaction for that event. Redaction removes or hides the message content where the redaction is accepted and synchronized.</p>
            <p>However, deletion does not guarantee that every copy disappears everywhere. Other users may have already seen, copied, screenshotted, downloaded, or forwarded the content. Other Matrix clients, servers, federated servers, or cached timelines may temporarily retain older event data. Files that recipients downloaded to their own devices are outside XMO's control. Blockchain donation records cannot be deleted from public blockchains.</p>
          </Section>

          <Section title="5. Shared Media, Files, Links, and Search">
            <p>XMO may index loaded room events to show shared media tabs, file lists, links, downloaded media, and storage usage. These indexes are used to make content easier to find inside the app. Older media may appear after the app loads older Matrix history from the server. Shared media tabs may group content by type, such as photos, videos, audio, files, and links.</p>
          </Section>

          <Section title="6. Calls and Call History">
            <p>XMO supports direct and group voice/video calling. Call signaling and call state are processed through Matrix and WebRTC-related services. XMO may store local call history on your device, scoped to the current logged-in user, including call participants, room, call type, direction, status, timestamp, and duration.</p>
            <p>Group call creators may have permission to end a group call for everyone, while other participants may only leave the call for themselves. Direct calls and group calls may behave differently because they involve different Matrix/WebRTC call flows.</p>
          </Section>

          <Section title="7. Email OTP Verification">
            <p>XMO uses an OTP backend to send verification codes by email. When you request verification, the backend receives the email address you submit, generates a six-digit OTP, stores that OTP temporarily in memory, limits verification attempts, and sends the OTP using configured email delivery credentials. OTP records are temporary and are removed after expiry, successful verification, or excessive failed attempts.</p>
          </Section>

          <Section title="8. Wallet Login">
            <p>If you choose wallet login, you enter or choose a username and connect a wallet. XMO asks your wallet to sign an authentication message. The signed message proves that you control the wallet address and allows XMO to register or authenticate your Matrix account for the selected username. This signature process does not require a blockchain transaction for login and does not give XMO access to your wallet private key.</p>
            <p>You should always review wallet prompts before signing and make sure the prompt is for XMO and not for an unknown website or malicious app.</p>
          </Section>

          <Section title="9. Donations">
            <p>If you use the donation feature, XMO sends donation amount information to the XMO donation backend, which creates a checkout link through Thirdweb. Thirdweb, wallet providers, blockchain networks, payment routers, and other crypto infrastructure may process additional information according to their own privacy policies.</p>
            <p>Blockchain transactions are public and may reveal wallet addresses, amounts, token types, network information, and transaction history. XMO does not control blockchain confirmation times, gas fees, failed wallet transactions, or third-party checkout availability.</p>
          </Section>

          <Section title="10. Third-Party Services">
            <p>XMO may rely on or interact with: Matrix/Synapse homeserver services, email delivery services for OTP codes, Firebase initialization services, wallet providers (MetaMask, Coinbase Wallet, Rainbow, or other WalletConnect-compatible wallets), WalletConnect/Reown wallet connection infrastructure, Thirdweb for donation checkout links, and blockchain networks for public crypto transactions.</p>
            <p>Third-party services are independent from XMO. Their privacy practices, security practices, data retention, international transfers, user rights processes, and support channels may differ from ours. XMO is not responsible for the privacy practices of third-party websites, wallets, networks, or services.</p>
          </Section>

          <Section title="11. How We Share Information">
            <p>We share or disclose information when necessary to operate XMO — for example, message content, media, room state, profile data, call signaling, and account data may be shared through Matrix infrastructure so that recipients, group members, channel subscribers, and authorized story viewers can receive and view the content.</p>
            <p>We may share email addresses with email delivery systems needed to send OTP codes. Wallet login and donation information may be shared with wallet providers, WalletConnect/Reown infrastructure, Thirdweb, and blockchain networks. We may also disclose information to comply with law, respond to legal process, enforce our rights, maintain service security, or protect XMO, users, and the public from spam, abuse, fraud, or harm.</p>
            <p className="text-[#a89bff] font-medium">We do not sell your personal information.</p>
          </Section>

          <Section title="12. Privacy Controls">
            <p>XMO includes privacy and account controls that may allow you to change your profile name and profile photo, remove your profile photo, configure account visibility, choose who can see your profile picture, choose who can view stories, block users, mute chats, delete messages where supported, and manage group or channel actions depending on your role.</p>
            <p>The app also includes local controls for clearing media cache, managing downloaded storage, and logging out. Privacy controls may not be retroactive in every situation — changing story visibility affects future access but cannot remove screenshots already taken by other users. Clearing cache removes local cached data but does not delete server-side room history.</p>
          </Section>

          <Section title="13. Security">
            <p>We use reasonable technical and organizational measures to protect XMO services. Sensitive backend secrets, such as email credentials and Thirdweb secret keys, should be stored only on server infrastructure and never inside the public mobile app.</p>
            <p>XMO's security direction is to make the app more secure over time by reducing unnecessary data exposure, improving end-to-end encryption support, separating backend secrets from client code, protecting session data, and improving how the app handles account recovery, device trust, call state, media uploads, and cached content.</p>
            <p>No service can guarantee absolute security. You are responsible for keeping your password, device, wallet, and recovery information secure. Use a strong password, keep your device updated, protect your wallet, avoid signing unknown wallet prompts, avoid sharing OTP codes, and be careful when opening links or files from other users.</p>

            <Sub title="13.1 Abuse, Safety, and Moderation" />
            <p>XMO may process account, room, message, call, and technical information to investigate abuse, spam, fraud, impersonation, illegal content, security threats, or violations of applicable rules. Group and channel admins may also have moderation capabilities within their rooms, such as managing members, permissions, invite links, pinned messages, or deleted content depending on their role.</p>
          </Section>

          <Section title="14. Data Retention">
            <p>We retain information for as long as needed to provide XMO, comply with legal obligations, resolve disputes, enforce agreements, and maintain security. Matrix messages, media, rooms, groups, channels, stories, and profile data may remain on the homeserver until they are deleted, redacted, expired, or removed according to server configuration and Matrix behavior.</p>
            <p>OTP records are temporary and expire quickly. Local cache and downloaded files remain on your device until you clear them, delete them, or uninstall the app. Blockchain transaction data may remain publicly available indefinitely because public blockchains are designed to preserve transaction records.</p>
          </Section>

          <Section title="15. International Transfers">
            <p>XMO services, Matrix servers, third-party providers, wallet providers, and blockchain infrastructure may process information in countries different from where you live. By using XMO, you understand that your information may be transferred, stored, and processed in those locations.</p>
          </Section>

          <Section title="16. Children's Privacy">
            <p>XMO is not intended for children under the minimum age required by applicable law. If we learn that a child has provided personal information without required consent, we will take reasonable steps to delete or disable the account where required.</p>
          </Section>

          <Section title="17. Your Choices and Rights">
            <p>Depending on your location, you may have rights to access, correct, export, delete, restrict, or object to processing of your personal information. Some data can be changed directly in the app — changing your display name, changing or removing your profile photo, adjusting privacy settings, blocking users, deleting supported messages, clearing local cache, managing downloads, logging out, and leaving groups or channels where available.</p>
            <p>For server-side requests that cannot be completed directly in the app, contact us using the contact information in this policy. Some requests may be limited by Matrix federation, recipient copies, technical constraints, legal requirements, security needs, or blockchain immutability.</p>
          </Section>

          <Section title="18. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. If we make material changes, we will update the effective date and may provide notice in the app or through another appropriate method.</p>
          </Section>

          <Section title="19. Contact">
            <p>For privacy questions or requests, contact:</p>
            <p><code>xmoapp@proton.me</code></p>
          </Section>

          <Section title="20. Reference Policies Reviewed">
            <p>This policy was prepared after reviewing privacy-policy structures and coverage patterns from major messaging platforms, including Telegram, WhatsApp, and WeChat, and then tailoring the content to XMO's actual Matrix-based codebase and features.</p>
          </Section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
