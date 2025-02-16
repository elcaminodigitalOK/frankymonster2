<!-- Updated index.tsx -->
    import { json, type MetaFunction } from '@remix-run/cloudflare';
    import { ClientOnly } from 'remix-utils/client-only';
    import { BaseChat } from '~/components/chat/BaseChat';
    import { Chat } from '~/components/chat/Chat.client';
    import { Header } from '~/components/header/Header';
    import BackgroundRays from '~/components/ui/BackgroundRays';
    import { FrankyHeader } from '~/components/header/FrankyHeader'; // Import FrankyHeader

    export const meta: MetaFunction = () => {
      return [
        { title: 'Franky' },
        { name: 'description', content: 'Talk with Franky, an Argentinian AI Linux expert' },
      ];
    };

    export const loader = () => json({});

    export default function Index() {
      return (
        <div className="flex flex-col h-full w-full bg-franky-elements-background-depth-1">
          <FrankyHeader /> {/* Use FrankyHeader */}
          <BackgroundRays />
          <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
        </div>
      );
    }
