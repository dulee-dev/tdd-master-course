import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const ContentItem = (props: Props) => {
  return (
    <article className={clsx(props.className)}>
      <Link href="/">
        <Image width={600} height={600} src="/window.svg" alt="thumb" />
      </Link>
      <Link href="/">
        <h2 className="text-2xl font-semibold mb-2 inline">title</h2>
      </Link>
      <Link href="/">
        <div className="text-neutral-400 mb-4">
          ldksjfal kdsjf;aldsj fa;lkdsj fa;lksdjf ;laksdjf a;slidf jasdlkf
          ja;lsdkfj a;sldkf j;alsdk jfkla{' '}
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="mr-2"
            width={32}
            height={32}
            src="/globe.svg"
            alt="thumb"
          />
          <span>nickname</span>
        </div>
        <div>3일 전</div>
      </div>
    </article>
  );
};
