import { HeaderActionButtons } from '~/components/header/HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { useStore } from '@nanostores/react';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';

export function FrankyHeader() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames(
        'flex items-center p-5 border-b h-[var(--header-height)]',
        {
          'border-transparent': !chat.started,
          'border-franky-elements-borderColor': chat.started,
        },
      )}
    >
      <div className="flex items-center gap-2 z-logo text-franky-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <img src="/franky-logo.png" alt="Franky Logo" className="w-[90px] inline-block dark:hidden" />
        </a>
      </div>
      {chat.started && (
        <>
          <span className="flex-1 px-4 truncate text-center text-franky-elements-textPrimary">
            <ChatDescription />
          </span>
          <HeaderActionButtons />
        </>
      )}
    </header>
  );
}
