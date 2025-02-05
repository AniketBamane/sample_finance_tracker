import { Skeleton } from "@/components/ui/skeleton";

const  Loading = () => {
  return (
    <div className="min-h-screen bg-neutral-background p-4 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-12 w-24" />
            </div>
          ))}
        </div>

        <div className="h-[300px] bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;