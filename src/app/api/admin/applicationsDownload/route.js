
import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";
import ExcelJS from "exceljs";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const jobs = await Job.find({});
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Applications by Job");

    let rowIndex = 1;

    for (const job of jobs) {
      worksheet.getCell(`A${rowIndex}`).value = `Job Title: ${job.title}`;
      worksheet.getCell(`A${rowIndex}`).font = { bold: true };
      rowIndex++;

      if (job.description) {
        worksheet.getCell(`A${rowIndex}`).value = `Description: ${job.description}`;
        rowIndex++;
      }

      if (job.location) {
        worksheet.getCell(`A${rowIndex}`).value = `Location: ${job.location}`;
        rowIndex++;
      }

      rowIndex++;

      worksheet.getRow(rowIndex).values = ["Name", "Email", "Phone", "Submitted At"];
      worksheet.getRow(rowIndex).font = { bold: true };
      rowIndex++;

      const applications = await Application.find({ jobId: job._id });

      for (const app of applications) {
        worksheet.getRow(rowIndex).values = [
          app.name,
          app.email,
          Number(app.phone),,
          app.createdAt.toISOString(),
        ];
        rowIndex++;
      }

      rowIndex += 2;
    }

    worksheet.columns = [
      { width: 30 },
      { width: 30 },
      { width: 20, style: { numFmt: '0' } },
      { width: 30 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=applications-by-job.xlsx",
      },
    });
  } catch (error) {
    console.error("❌ Excel Export Error:");
    return new Response(JSON.stringify({ success: false, message: "Error exporting Excel file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
