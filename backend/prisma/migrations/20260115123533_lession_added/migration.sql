-- CreateTable
CREATE TABLE "Lession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "duration" INTEGER,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Lession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lession" ADD CONSTRAINT "Lession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
