import { test, expect } from '../fixtures/test';

test.describe('Next.js Parallel & Intercepting Route Modals (Rule 8)', () => {
  test.describe('Workflow 1: Add Doctor (/doctors/new)', () => {
    test('Soft navigation intercepts into @modal over background view, URL updates', async ({ page }) => {
      await page.goto('/doctors');
      await expect(page.getByRole('heading', { name: 'Doctors Directory' })).toBeVisible();

      // Soft navigation via client Link
      await page.getByTestId('btn-add-doctor').click();

      // Modal dialog is displayed over background
      await expect(page.getByRole('dialog', { name: 'Add Doctor' })).toBeVisible();
      await expect(page).toHaveURL(/\/doctors\/new$/);

      // Background list is still present
      await expect(page.getByTestId('doctors-table-body')).toBeVisible();

      // Back navigation closes modal
      await page.goBack();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(page).toHaveURL(/\/doctors$/);

      // Forward navigation re-opens modal
      await page.goForward();
      await expect(page.getByRole('dialog', { name: 'Add Doctor' })).toBeVisible();
      await expect(page).toHaveURL(/\/doctors\/new$/);

      // Close via escape / close button
      await page.getByRole('button', { name: 'Close dialog' }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible();
    });

    test('Direct URL visit and hard refresh render standalone canonical page', async ({ page }) => {
      // Direct navigation
      await page.goto('/doctors/new');
      await expect(page.getByRole('heading', { name: 'Add New Doctor' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Back to Doctors/i })).toBeVisible();

      // Background directory should not be present in canonical full page
      await expect(page.getByTestId('doctors-table-body')).not.toBeVisible();

      // Full reload maintains canonical page
      await page.reload();
      await expect(page.getByRole('heading', { name: 'Add New Doctor' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save Doctor' })).toBeVisible();

      // Cancel button redirects to doctors directory
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page).toHaveURL(/\/doctors$/);
    });

    test('Navigating to another portal route clears @modal slot', async ({ page }) => {
      await page.goto('/doctors');
      await page.getByTestId('btn-add-doctor').click();
      await expect(page.getByRole('dialog', { name: 'Add Doctor' })).toBeVisible();

      // Navigating to another portal route clears modal slot
      await page.goto('/patients');
      await expect(page).toHaveURL(/\/patients$/);
      await expect(page.getByRole('dialog')).not.toBeVisible();
    });
  });

  test.describe('Workflow 2: Add Patient (/doctors/[doctorId]/patients/new)', () => {
    test('Soft navigation intercepts into @modal from doctor detail view', async ({ page }) => {
      await page.goto('/doctors/doc-1');
      await expect(page.getByTestId('doctor-name-heading')).toContainText('Dr. Sarah Jenkins');

      // Click assign patient
      await page.getByTestId('btn-assign-patient').click();
      await expect(page.getByRole('dialog', { name: 'Add Patient' })).toBeVisible();
      await expect(page).toHaveURL(/\/doctors\/doc-1\/patients\/new$/);

      // Doctor header background is still visible behind modal
      await expect(page.getByTestId('doctor-name-heading')).toBeVisible();

      // Back navigation closes modal
      await page.goBack();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(page).toHaveURL(/\/doctors\/doc-1$/);
    });

    test('Direct visit to doctor add patient renders standalone canonical page', async ({ page }) => {
      await page.goto('/doctors/doc-1/patients/new');
      await expect(page.getByRole('heading', { name: 'Register Patient' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Back to Doctor Profile/i })).toBeVisible();

      // Refresh renders standalone page
      await page.reload();
      await expect(page.getByRole('heading', { name: 'Register Patient' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Register Patient' })).toBeVisible();

      // Cancel returns to doctor profile
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page).toHaveURL(/\/doctors\/doc-1$/);
    });
  });

  test.describe('Workflow 3: Edit Patient (/patients/[patientId]/edit)', () => {
    test('Soft navigation from patient table opens edit modal over roster', async ({ page }) => {
      await page.goto('/patients');
      await expect(page.getByTestId('patient-row-pat-1')).toBeVisible();

      // Click Edit link for pat-1
      await page.getByTestId('btn-edit-patient-pat-1').click();
      await expect(page.getByRole('dialog', { name: 'Edit Patient Record' })).toBeVisible();
      await expect(page).toHaveURL(/\/patients\/pat-1\/edit$/);

      // Background roster remains visible
      await expect(page.getByTestId('patient-row-pat-1')).toBeVisible();

      // Back navigation closes modal
      await page.goBack();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(page).toHaveURL(/\/patients$/);
    });

    test('Direct URL visit renders standalone canonical edit page', async ({ page }) => {
      await page.goto('/patients/pat-1/edit');
      await expect(page.getByRole('heading', { name: 'Edit Patient Record' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Back to Patients/i })).toBeVisible();

      // Verify form is populated with patient details
      const nameInput = page.locator('input[name="name"]');
      await expect(nameInput).toHaveValue('John Doe');

      // Refresh preserves canonical edit page
      await page.reload();
      await expect(page.getByRole('heading', { name: 'Edit Patient Record' })).toBeVisible();

      // Cancel returns to patients
      await page.getByRole('button', { name: 'Cancel' }).click();
      await expect(page).toHaveURL(/\/patients$/);
    });

    test('Invalid patient ID renders graceful not-found recovery', async ({ page }) => {
      await page.goto('/patients/non-existent-pat-999/edit');
      await expect(page.getByRole('heading', { name: 'Patient Not Found' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Return to Patients' })).toBeVisible();
    });
  });
});
